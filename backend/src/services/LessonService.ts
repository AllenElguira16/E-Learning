import { Injectable } from '@tsed/di';
// import fs from 'fs';

/**
 * Student Provider
 */
@Injectable()
export class LessonService {
  // constructor() {}
  private lessons: ILesson[] = [
    {
      lesson_id: 1,
      title: 'Sample Video',
      description: 'Sample description that is related to the title',
      file: 'sample1.mp4',
      type: 'video',
      created: new Date()
    },
    {
      lesson_id: 2,
      title: 'Sample Powerpoint',
      description: 'Sample description that is related to the title',
      file: 'sample2.pptx',
      type: 'document',
      created: new Date()
    },
    {
      lesson_id: 3,
      title: 'Sample Word Document',
      description: 'Sample description that is related to the title',
      file: 'sample3.docx',
      type: 'document',
      created: new Date()
    },
    {
      lesson_id: 4,
      title: 'Sample PDF Document',
      description: 'Sample description that is related to the title',
      file: 'sample4.pdf',
      type: 'document',
      created: new Date()
    }
  ];

  /**
   * Retrieve all students per page
   *
   * @returns Student[]
   */
  async getLessons(): Promise<ILesson[]> {
    return this.lessons;
  }

  /**
   * Retrieve all students per page
   */
  async getLessonById(lesson_id: number): Promise<ILesson|undefined> {
    return this.lessons.find((lesson) => lesson.lesson_id === lesson_id);
  }
}
