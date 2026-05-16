
import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    age!: number;
}
