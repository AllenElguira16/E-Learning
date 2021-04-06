import {Controller, Get} from "@tsed/common";
import { ContentType } from "@tsed/schema";

@Controller("/student")
export class StudentController {
  @Get("/list")
  @ContentType('application/json')
  listOfStudents(): IStudent[] {
    const students: IStudent[] = [];
    const padding = "000000";
    for (let i = 0; i < 50; i++) {
      const id = i + 1;
      students.push({
        student_id: 'STUDENT-' + (padding.substr(id.toString().length) + id),
        first_name: 'Michael Allen',
        middle_name: 'Erguiza',
        last_name: 'Elguira',
        profile_id: null,
        created: new Date()
      });
    }

    return students;
  }
}
