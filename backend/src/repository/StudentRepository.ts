import { EntityRepository, Repository } from 'typeorm';
import { Student } from '../entity/Student';
import { StudentInput } from '../model/StudentInput';

/**
 * Student Repository
 */
@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async getAllStudent(): Promise<Student[]> {
    return this.find();
  }

  /**
   * For adding new student
   * 
   * @param student TInput
   * @returns 
   */
  async addStudent(student: StudentInput): Promise<Student> {
    return this.save(student);
  }

  /**
   * For editing student 
   * 
   * @param student_id IStudent["student_id"]
   * @param student TInput
   * @returns void | string 
   */
  async editStudent(student_id: IStudent['student_id'], student: StudentInput): Promise<Student | void> {
    const studentToUpdate = await this.findOne(student_id);

    if (!studentToUpdate) return;

    studentToUpdate.first_name = student.first_name;
    studentToUpdate.middle_name = student.middle_name;
    studentToUpdate.last_name = student.last_name;

    return this.save(studentToUpdate);
  }
}
