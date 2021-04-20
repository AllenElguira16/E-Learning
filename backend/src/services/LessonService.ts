import { Inject, Injectable } from '@tsed/di';
import { MultipartFile } from '@tsed/common';
import { UseConnection } from '@tsed/typeorm';
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
   * Retrieve all students per page
   *
   * @returns Student[]
   */
  async getLessons(offset: number, limit: number): Promise<[Lesson[], number]> {
    return this.lessonRepository.getLessons(offset, limit);
  }

  /**
   * Retrieve all students per page
   */
  async getLessonById(lesson_id: number): Promise<ILesson|undefined> {
    return this.lessonRepository.getLessonById(lesson_id);
  }

  /**
   *
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
   *
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
}
