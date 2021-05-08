import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, QueryParams } from '@tsed/common';
import { ContentType } from '@tsed/schema';
import { Student } from 'src/entity/Student';
import { StudentService } from '../services/StudentService';
import { StudentInput } from '../model/StudentInput';

/**
 * Controller for student api
 */
@Controller('/students')
@ContentType('application/json')
export class StudentController {
  constructor(private studentService: StudentService) { }

  /**
   * Get all students
   *
   * @param page
   * @param limit
   * @returns IResponse
   */
  @Get()
  async listOfStudents(
    @QueryParams('page') page: number,
    @QueryParams('limit') limit: number,
    @QueryParams('search') search: string
    ): Promise<IResponse> {
    const offset = ((page - 1) * limit);

    const [students, count] = await this.studentService.getStudents(offset, limit, search);

    return {
      status: 200,
      message: 'Student list retrieved successfully',
      details: {
        total_pages: Math.ceil(count / limit),
        current_page: page,
        students
      }
    };
  }

  /**
   * Entry point for adding student
   *
   * @param newStudent
   * @returns IResponse
   */
  @Post()
  async addStudent(@BodyParams() newStudent: StudentInput): Promise<IResponse> {
    await this.studentService.addStudent(newStudent);

    return {
      status: 200,
      message: 'Student successfully added'
    };
  }

  /**
   * Entry point for editing student
   *
   * @param student_id
   * @param student
   * @returns IResponse
   */
  @Put('/:student_id')
  async editStudent(
    @PathParams() student_id: IStudent['student_id'],
    @BodyParams() student: TInput
  ): Promise<IResponse> {
    await this.studentService.editStudent(student_id, student);

    return {
      status: 200,
      message: 'Successfully updating student',
      details: {
        student
      }
    };
  }

  /**
   * Entry point for editing student
   *
   * @param student_id
   * @returns IResponse
   */
  @Delete('/:student_id')
  async deleteStudent(
    @PathParams('student_id') student_id: Student['student_id'],
  ): Promise<IResponse> {
    await this.studentService.deleteStudent(student_id);

    return {
      status: 200,
      message: 'Successfully successfully deleted',
    };
  }
}
