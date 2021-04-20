import { Inject, Injectable } from '@tsed/di';
import { MultipartFile } from '@tsed/common';
import { UseConnection } from '@tsed/typeorm';
import { DeleteResult } from 'typeorm';

import { LessonRepository } from '../repository/LessonRepository';
import { Lesson } from '../entity/Lesson';

/**
 * Student Provider
 */
@Injectable()
export class LessonService {
  constructor(
    @Inject()
    @UseConnection('default')
    private lessonRepository: LessonRepository
  ) {}

  /**
   * Retrieve all lesson per page
   *
   * @returns ILesson[]
   */
  async getLessons(offset: number, limit: number): Promise<[Lesson[], number]> {
    return this.lessonRepository.getLessons(offset, limit);
  }

  /**
   * Retrieve lesson by id
   * 
   * @returns Promise<Ilesson|undefined>
   */
  async getLessonById(lesson_id: number): Promise<ILesson|undefined> {
    return this.lessonRepository.getLessonById(lesson_id);
  }

  /**
   * Add Lesson
   * 
   * @param title
   * @param description
   * @param file
   * @returns Promise<ILesson>
   */
  async addLesson(title: string, description: string, file?: MultipartFile): Promise<ILesson> {
    type TData = Pick<ILesson, 'title'|'description'|'file'|'type' >;

    let data: TData = {
      title,
      description
    };

    if (file) {
      data = {
        ...data,
        file: file.filename,
        type: file.mimetype.match(/video\/.*/) ? 'video' : 'document'
      };
    }

    return this.lessonRepository.addLesson(data);
  }

  /**
   * Edit Lesson
   * 
   * @param title
   * @param description
   * @param file
   * @returns Promise<ILesson>
   */
  async editLesson(lesson_id: number, title: string, description: string, file?: MultipartFile): Promise<ILesson | void> {
    type TData = Pick<ILesson, 'title'|'description'|'file'|'type' >;

    let data: TData = {
      title,
      description
    };

    if (file) {
      data = {
        ...data,
        file: file.filename,
        type: file.mimetype.match(/video\/.*/) ? 'video' : 'document'
      };
    }

    return this.lessonRepository.editLesson(lesson_id, data);
  }

  /**
   * Delete Lesson
   *
   * @param lesson_id ILesson["student_id"]
   * @returns void
   */
  async deleteLesson(lesson_id: ILesson['lesson_id']): Promise<DeleteResult> {
    return this.lessonRepository.deleteLesson(lesson_id);
  }
}
