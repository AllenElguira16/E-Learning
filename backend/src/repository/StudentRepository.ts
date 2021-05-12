import { DeleteResult, EntityRepository, Like, Repository } from 'typeorm';
import { Student } from '../entity/Student';
import { StudentInput } from '../model/StudentInput';

/**
 * Student Repository
 */
@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  /**
   * get list of students
   * 
   * @returns Student[]
   */
  async getStudents(offset: number, limit: number, search: string): Promise<[Student[], number]> {
    return this.findAndCount({
      where: {
        last_name: Like(`%${search}%`)
      },
      take: limit,
      skip: offset
    });
  }

  /**
   * get count of students
   * 
   * @returns number
   */
  async countStudent(): Promise<number> {
    const [,count] = await this.findAndCount();
    return count;
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
  async editStudent(student_id: IStudent['student_id'], student: TInput): Promise<Student | void> {
    const studentToUpdate = await this.findOne(student_id);

    if (!studentToUpdate) return;

    studentToUpdate.first_name = student.first_name;
    studentToUpdate.middle_name = student.middle_name;
    studentToUpdate.last_name = student.last_name;

    if (student.password !== undefined) {
      studentToUpdate.password = student.password as string;
    }

    return this.save(studentToUpdate);
  }

  /**
   * Removing Student from database
   * 
   * @param student TInput
   * @returns 
   */
  async deleteStudent(student_id: Student['student_id']): Promise<DeleteResult> {
    return this.delete(student_id);
  }
}
