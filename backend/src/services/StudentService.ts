import { Inject, Injectable } from "@tsed/di";
import { UseConnection } from "@tsed/typeorm";
import { Student } from "../entity/Student";
import { StudentInput } from "../model/StudentInput";
import { StudentRepository } from "../repository/StudentRepository";
import {Exception} from "@tsed/exceptions"
import { ValidationException } from "src/exceptions/ValidationException";

@Injectable()
export class StudentService {
  constructor(
    @Inject()
    @UseConnection('default')
    private studentRepository: StudentRepository
  ) {}

  async getAll(): Promise<Student[]> {
    return this.studentRepository.getAllStudent();
  }

  async create(student: TInput): Promise<Student> {
    // const {first_name, middle_name, last_name} = student;
    const errors: TValidationObject<TInput> = {
      hasErrors: false, 
      data: {
        first_name: {},
        middle_name: {},
        last_name: {}
      }
    }

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

    // console.log(errors);
    if (errors.hasErrors) {
      throw new ValidationException(errors.data as never)
    }

    return this.studentRepository.createNewStudent(student);
  }
}
