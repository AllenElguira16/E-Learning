import { Inject, Injectable } from '@tsed/di';
import { MultipartFile } from '@tsed/common';
import { UseConnection } from '@tsed/typeorm';
import { DeleteResult } from 'typeorm';

import { LessonRepository } from '../repository/LessonRepository';
import { Lesson } from '~entities/Lesson';
import { Subject } from '~entities/Subject';

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
  async getLessons(subject_id: number, offset: number, limit: number, search: string): Promise<[Lesson[], number]> {
    return this.lessonRepository.getLessons(subject_id, offset, limit, search);
  }

  /**
   * Retrieve lesson by id
   * 
   * @returns Promise<Ilesson|undefined>
   */
  async getLessonById(subject_id: number, lesson_id: number): Promise<ILesson|undefined> {
    return this.lessonRepository.getLessonById(subject_id, lesson_id);
  }

  /**
   * Add Lesson
   * 
   * @param title
   * @param description
   * @param file
   * @returns Promise<ILesson>
   */
  async addLesson(lesson: { subject_id: Subject, title: string, description: string, file?: MultipartFile } ): Promise<ILesson> {
    type TData = Pick<ILesson, 'title'|'description'|'file'|'type'|'subject_id' >;

    let data: TData = {
      subject_id: lesson.subject_id,
      title: lesson.title,
      description: lesson.description
    };

    if (lesson.file) {
      data = {
        ...data,
        file: lesson.file.filename,
        type: lesson.file.mimetype.match(/video\/.*/) ? 'video' : 'document'
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
