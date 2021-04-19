import { EntityRepository, Repository } from 'typeorm';
import { Lesson } from '../entity/Lesson';

/**
 * Student Repository
 */
@EntityRepository(Lesson)
export class LessonRepository extends Repository<Lesson> {
  /**
   * get list of students
   *
   * @returns Student[]
   */
  async getLessons(offset: number, limit: number): Promise<[Lesson[], number]> {
    return this.findAndCount({
      take: limit,
      skip: offset
    });
  }

  /**
   * get list of students
   *
   * @returns Student[]
   */
  async getLessonById(lesson_id: number): Promise<Lesson | undefined> {
    return this.findOne(lesson_id);
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
  async addStudent(student: Pick<ILesson, 'title'|'description'|'file'|'type' >): Promise<ILesson> {
    return this.save(student);
  }
}
