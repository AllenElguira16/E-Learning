import { EntityRepository, Repository } from "typeorm";
import { Student } from "../entity/Student";
import { StudentInput } from "../model/StudentInput";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async getAllStudent(): Promise<Student[]> {
    return this.find();
  }

  async createNewStudent(student: StudentInput): Promise<Student> {
    return this.save(student)
  }
}
