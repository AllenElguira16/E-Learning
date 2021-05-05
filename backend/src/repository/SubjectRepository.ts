import { EntityRepository, Repository } from 'typeorm';

import { Subject } from '../entity/Subject';

/**
 * Student Repository
 */
@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {
  /**
   * get list of students
   *
   * @returns Student[]
   */
  async getSubjects(offset: number, limit: number): Promise<[Subject[], number]> {
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
  async getSubjectByID(subjecId: number): Promise<Subject|undefined> {
  return this.findOne(subjecId);
}

  /**
   * For adding new student
   *
   * @param student TInput
   * @returns
   */
  async addSubject(subject: TSubjectInput): Promise<ISubject> {
    return this.save(subject);
  }
}
