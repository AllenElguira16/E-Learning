import { Inject, Injectable } from '@tsed/di';
import { UseConnection } from '@tsed/typeorm';
import { DeleteResult } from 'typeorm';

import { Student } from '../entity/Student';
import { StudentRepository } from '../repository/StudentRepository';

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
}
