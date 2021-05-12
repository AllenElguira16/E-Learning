import { DeleteResult, EntityRepository, Like, Repository } from 'typeorm';

import { Lesson } from '~entities/Lesson';

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
  async getLessons(subject_id: number, offset: number, limit: number, search: string): Promise<[Lesson[], number]> {
    return this.findAndCount({
      where: {
        subject_id,
        title: Like(`%${search}%`)
      },
      take: limit,
      skip: offset
    });
  }

  /**
   * get list of students
   *
   * @returns Student[]
   */
  async getLessonById(subject_id: number, lesson_id: number): Promise<Lesson | undefined> {
    return this.findOne({
      where: {
        subject_id,
        lesson_id
      }
    });
  }

  /**
   * get count of students
   *
   * @returns number
   */
  async countLesson(): Promise<number> {
    const [,count] = await this.findAndCount();
    return count;
  }

  /**
   * For adding new student
   *
   * @param student TInput
   * @returns
   */
  async addLesson(student: Pick<ILesson, 'title'|'description'|'file'|'type'|'subject_id' >): Promise<ILesson> {
    return this.save(student);
  }

  /**
   * For adding new student
   *
   * @param student TInput
   * @returns
   */
  async editLesson(lesson_id: number, lesson: Pick<ILesson, 'title'|'description'|'file'|'type' >): Promise<ILesson | void> {
    const currentLesson = await this.findOne(lesson_id);

    if (!currentLesson) return;

    currentLesson.title = lesson.title;
    currentLesson.description = lesson.description;
    
    if (lesson.file && lesson.type) {
      currentLesson.file = lesson.file;
      currentLesson.type = lesson.type;
    }
    
    return this.save(currentLesson);
  }

  /**
   * Removing lesson_id from database
   * 
   * @param lesson_id TInput
   * @returns 
   */
  async deleteLesson(lesson_id: ILesson['lesson_id']): Promise<DeleteResult> {
    return this.delete(lesson_id);
  }
}
