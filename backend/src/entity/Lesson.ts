import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Student Entity
 */
@Entity()
export class Lesson implements ILesson {

  @PrimaryGeneratedColumn()
  lesson_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  file: string;

  @Column({ nullable: true })
  type: string;

  @Column({
    type: 'datetime',
    default: (new Date).toDateString()
  })
  created: Date;
}
