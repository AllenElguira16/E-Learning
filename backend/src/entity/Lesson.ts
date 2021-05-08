import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './Subject';

/**
 * Student Entity
 */
@Entity()
export class Lesson implements ILesson {

  @PrimaryGeneratedColumn()
  lesson_id: number;

  @ManyToOne(() => Subject, subject => subject.subject_id, {
    onDelete: 'CASCADE',
  })
  subject_id: Subject;

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
