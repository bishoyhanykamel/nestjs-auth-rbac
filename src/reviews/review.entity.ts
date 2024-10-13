import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: false
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: true
  })
  description: string;

  @Column({
    type: 'int',
    nullable: false
  })
  rating: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  bookId: number;
}