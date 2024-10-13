import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  author: string;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  description: string;
}