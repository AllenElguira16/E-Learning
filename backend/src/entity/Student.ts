import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Student Entity
 */
@Entity()
export class Student implements IStudent {
  
  @PrimaryGeneratedColumn()
  student_id: number;
  
  @Column()
  first_name: string;
  
  @Column()
  middle_name: string;
  
  @Column()
  last_name: string;
  
  @Column({ nullable: true })
  profile_id: number;
  
  @Column({
    type: 'datetime',
    default: (new Date).toDateString()
  })
  created: Date;
}
