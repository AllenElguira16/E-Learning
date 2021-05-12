import { DeleteResult, EntityRepository, Like, Repository } from 'typeorm';

import { Subject } from '~entities/Subject';

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
  async getSubjects(offset: number, limit: number, search: string): Promise<[Subject[], number]> {
    return this.findAndCount({
      where: {
        title: Like(`%${search}%`),
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

  /**
   * For adding new student
   *
   * @param student TInput
   * @returns
   */
  async editSubject(subject_id: ISubject['subject_id'], subject: TSubjectInput): Promise<ISubject | void> {
    const subjectToUpdate = await this.findOne(subject_id);

    if (!subjectToUpdate) return;

    subjectToUpdate.title = subject.title;
    subjectToUpdate.description = subject.description;

    return this.save(subjectToUpdate);
  }

  /**
   * For adding new student
   *
   * @param student TInput
   * @returns
   */
  async deleteSubject(subject_id: ISubject['subject_id']): Promise<DeleteResult> {
    return this.delete(subject_id);
  }
}
