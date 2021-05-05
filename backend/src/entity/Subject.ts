import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Student Entity
 */
@Entity()
export class Subject implements ISubject {
  @PrimaryGeneratedColumn()
  subject_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'datetime',
    default: (new Date).toDateString()
  })
  created: Date;
}
