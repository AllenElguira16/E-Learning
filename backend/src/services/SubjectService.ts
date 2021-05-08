import { Inject, Injectable } from '@tsed/di';
import { UseConnection } from '@tsed/typeorm';

import { Subject } from 'src/entity/Subject';
import { SubjectRepository } from 'src/repository/SubjectRepository';
import { DeleteResult } from 'typeorm';

/**
 * Student Provider
 */
@Injectable()
export class SubjectService {
  constructor(
    @Inject()
    @UseConnection('default')
    private subjectRepository: SubjectRepository
  ) {}

  /**
   * Retrieve all lesson per page
   *
   * @returns ILesson[]
   */
  async getSubjects(offset: number, limit: number): Promise<[Subject[], number]> {
    return this.subjectRepository.getSubjects(offset, limit);
  }

  /**
   * Retrieve lesson by id
   * 
   * @returns Promise<Ilesson|undefined>
   */
  async getSubjectByID(subject_id: number): Promise<ISubject|undefined> {
    return this.subjectRepository.getSubjectByID(subject_id);
  }

  /**
   * Add Lesson
   * 
   * @param title
   * @param description
   * @param file
   * @returns Promise<ILesson>
   */
  async addSubject(subject: TSubjectInput): Promise<ISubject> {
    return this.subjectRepository.addSubject(subject);
  }

  /**
   * Add Lesson
   * 
   * @param title
   * @param description
   * @param file
   * @returns Promise<ILesson>
   */
  async editSubject(subject_id: ISubject['subject_id'], subject: TSubjectInput): Promise<ISubject | void> {
    return this.subjectRepository.editSubject(subject_id, subject);
  }

  /**
   * Add Lesson
   * 
   * @param title
   * @param description
   * @param file
   * @returns Promise<ILesson>
   */
  async deleteSubject(subject_id: ISubject['subject_id']): Promise<DeleteResult> {
    return this.subjectRepository.deleteSubject(subject_id);
  }
}
