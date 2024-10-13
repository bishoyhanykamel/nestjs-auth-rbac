import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: false
  })
  password: string;
}