import { BodyParams, Controller, Get, PathParams, Post, Put, QueryParams } from '@tsed/common';
import { ContentType } from '@tsed/schema';
import { StudentService } from '../services/studentService';

/**
 * Controller for student api
 */
@Controller('/student')
@ContentType('application/json')
export class StudentController {
  constructor(private studentService: StudentService) { }

  /**
   * Get all students
   * 
   * @returns IResponse
   */
  @Get('/list')
  async listOfStudents(
    @QueryParams('page') page: number,
    @QueryParams('limit') limit: number,
  ): Promise<IResponse> {
    const offset = ((page - 1) * limit);

    const [students, count] = await this.studentService.getStudents(offset, limit);

    return {
      status: 200,
      message: 'Successfully retrieve student list',
      data: {
        total_pages: Math.ceil(count / limit),
        current_page: page,
        students
      }
    };
  }

  /**
   * Entry point for adding student
   * 
   * @param newStudent Student
   * @returns IResponse
   */
  @Post('/add')
  async addStudent(@BodyParams() newStudent: TInput): Promise<IResponse> {
    // return newStudent;
    try {

      await this.studentService.addStudent(newStudent);

      return {
        status: 200,
        message: 'Successfully added new student'
      };
    } catch (error) {
      return {
        status: 400,
        message: 'Error adding new student',
        data: error.errors
      };
    }
  }

  /**
   * Entry point for editing student
   * 
   * @param student TInput
   * @returns IResponse
   */
  @Put('/edit/:student_id')
  async editStudent(@PathParams() student_id: IStudent['student_id'], @BodyParams() student: TInput): Promise<IResponse> {
    // return newStudent;
    try {

      await this.studentService.editStudent(student_id, student);

      return {
        status: 200,
        message: 'Successfully edit student',
        data: {
          student
        }
      };
    } catch (error) {
      return {
        status: 400,
        message: 'Error adding new student',
        data: error.errors
      };
    }
  }
}
