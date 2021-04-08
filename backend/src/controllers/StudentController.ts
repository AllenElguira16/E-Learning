import {BodyParams, Controller, Get, Post} from "@tsed/common";
import { ContentType } from "@tsed/schema";
import { StudentInput } from "../model/StudentInput";
import { StudentService } from "../services/studentService";

@Controller("/student")
@ContentType('application/json')
export class StudentController {
  constructor(private studentService: StudentService) {}

  private transformID(id: number | string) {
    const padding = "000000";
    const studentIdLength = id.toString().length;
    return padding.substr(studentIdLength) + id
  }
  /**
   * Get all students
   * 
   * @returns IResponse
   */
  @Get("/list")
  async listOfStudents(): Promise<IResponse<{ students: IStudent[]}>> {
    const students: IStudent[] = await this.studentService.getAll();
    for (let i = 0; i < students.length; i++) {
      students[i].student_id = 'STUDENT-' + this.transformID(students[i].student_id);
    }

    return {
      status: 200,
      message: 'Successfully retrieve student list',
      data: {
        students
      }
    };
  }

  /**
   * 
   * @param newStudent Student
   * @returns IResponse
   */
  @Post("/add")
  async addStudent(@BodyParams() newStudent: TInput): Promise<IResponse> {
    // return newStudent;
    try {
      
      await this.studentService.create(newStudent)
  
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
}
