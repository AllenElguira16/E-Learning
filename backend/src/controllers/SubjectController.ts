import {
  Controller,
  Get,
  QueryParams,
} from '@tsed/common';
import { ContentType } from '@tsed/schema';

import { LessonService } from '../services/LessonService';

/**
 * Controller for student api
 */
@Controller('/subjects')
@ContentType('application/json')
export class SubjectController {
  constructor(private lessonService: LessonService) {}
  /**
   * Get all students
   *
   * @param page
   * @param limit
   * @returns IResponse
   */
  @Get()
  async getLessons(
    @QueryParams('page') page: number,
    @QueryParams('limit') limit: number,
  ): Promise<IResponse> {
    const offset = ((page - 1) * limit);

    // const [lessons, count] = await this.lessonService.getLessons(offset, limit);

    const sampleData: ISubject[] = [
      {
        subject_id: 1,
        title: 'Sample Subject',
        description: 'Sample Description',
        lessons: (await this.lessonService.getLessons(offset, limit))[0] as unknown as ILesson[],
        created: new Date()
      }
    ];

    return {
      status: 200,
      message: 'Student list retrieved successfully',
      details: {
        total_pages: Math.ceil(1 / limit),
        subjects: sampleData
      }
    };
  }
}
