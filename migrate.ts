import "reflect-metadata";
import { MongoClient } from "mongodb";
import { AppDataSource } from "./src/config/data-source";
import { User } from "./src/entity/User";
import dotenv from "dotenv";

dotenv.config();

async function migrate() {
  try {
    // 1. POSTGRES CONNECT
    await AppDataSource.initialize();
    console.log("PostgreSQL connected");

    const userRepo = AppDataSource.getRepository(User);

    // 2. MONGO CONNECT
    const mongo = new MongoClient(process.env.MONGO_URL!);
    await mongo.connect();

    const db = mongo.db(process.env.MONGO_DB || "prisma");

    console.log("MongoDB connected", db.databaseName);
    console.log("Database:", db.databaseName);

    // 3. GET ALL COLLECTIONS
    const collections = await db.listCollections().toArray();

    console.log(
      "Collections Found:",
      collections.map((c) => c.name)
    );

    // 4. SCHEMA MAPPING (IMPORTANT)
    const schemaMap: any = {
      User: {
        repo: userRepo,
        fields: ["name", "email", "age"],
      },
    };

    // 5. MIGRATION LOOP (DYNAMIC)
    for (const col of collections) {
      const collectionName = col.name;

      const config = schemaMap[collectionName];

      if (!config) {
        console.log(`Skipping ${collectionName} (no mapping)`);
        continue;
      }

      const data = await db.collection(collectionName).find().toArray();

      console.log(`\nMigrating ${collectionName}: ${data.length} records`);

      if (data.length === 0) {
        console.log(` No data in ${collectionName}`);
        continue;
      }

      const batch: any[] = [];

      for (const item of data) {
        const entity: any = {};

        for (const field of config.fields) {
          entity[field] = item[field];
        }

        batch.push(entity);
      }

      // Bulk insert (faster than save loop)
      await config.repo.insert(batch);

      console.log(` Migrated ${collectionName}`);
    }

    console.log("\nMigration Completed Successfully");

    // 6. CLEANUP
    await mongo.close();
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Migration failed:");
    console.error(error);
  }
}

migrate();