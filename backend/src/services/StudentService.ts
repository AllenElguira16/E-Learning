import { Inject, Injectable } from '@tsed/di';
import { UseConnection } from '@tsed/typeorm';
import { Student } from '../entity/Student';
import { StudentRepository } from '../repository/StudentRepository';
import { ValidationException } from 'src/exceptions/ValidationException';
import { DeleteResult } from 'typeorm';

/**
 * Student Provider
 */
@Injectable()
export class StudentService {
  constructor(
    @Inject()
    @UseConnection('default')
    private studentRepository: StudentRepository
  ) {}

  /**
   * Retrieve all students per page
   *
   * @returns Student[]
   */
  async getStudents(offset: number, limit: number): Promise<[Student[], number]> {
    return this.studentRepository.getStudents(offset, limit);
  }

  /**
   * Retrieve all students per page
   *
   * @returns Student[]
   */
   async countStudents(): Promise<number> {
    return this.studentRepository.countStudent();
  }

  /**
   * Add student
   *
   * @param student TInput
   * @returns Student
   */
  async addStudent(student: TInput): Promise<Student> {
    return this.studentRepository.addStudent(student);
  }

  /**
   * Edit student
   *
   * @param student_id IStudent["student_id"]
   * @param student TInput
   * @returns Student | void
   */
  async editStudent(student_id: IStudent['student_id'], student: TInput): Promise<Student | void> {
    return this.studentRepository.editStudent(student_id, student);
  }

  /**
   * Edit student
   *
   * @param student_id IStudent["student_id"]
   * @returns Student | void
   */
   async deleteStudent(student_id: Student['student_id']): Promise<DeleteResult> {
    return this.studentRepository.deleteStudent(student_id);
  }

  /**
   * For validating input
   *
   * @param student TInput
   */
  private validate(student: TInput): void {
    const errors: TValidationObject<TInput> = {
      hasErrors: false,
      data: {
        first_name: {},
        middle_name: {},
        last_name: {}
      }
    };

    Object.keys(student).map((key: keyof TInput) => {
      if (!student[key]) {
        errors.data[key].message = 'Should not be empty';
        errors.hasErrors = true;
      }

      if (student[key].length < 2) {
        errors.data[key].message = 'should be greater than 2';
        errors.hasErrors = true;
      }

      if (student[key].length > 50) {
        errors.data[key].message = 'should be greater than 50';
        errors.hasErrors = true;
      }
    });

    if (errors.hasErrors) {
      throw new ValidationException(errors.data as never);
    }
  }
}
