import { Controller, Get, PathParams, QueryParams } from '@tsed/common';
import { ContentType } from '@tsed/schema';
import { LessonService } from '../services/LessonService';

/**
 * Controller for student api
 */
@Controller('/lesson')
@ContentType('application/json')
export class LessonController {
  constructor(private lessonService: LessonService) {}
  /**
   * Get all students
   *
   * @param page
   * @param limit
   * @returns IResponse
   */
  @Get('/list')
  async getLessons(
    @QueryParams('page') page: number,
    @QueryParams('limit') limit: number,
  ): Promise<IResponse> {
    const offset = ((page - 1) * limit);

    return {
      status: 200,
      message: 'Student list retrieved successfully',
      details: {
        // total_pages: Math.ceil(count / limit),
        // current_page: page,
        lessons: await this.lessonService.getLessons()
      }
    };
  }

  /**
   * Get all students
   *
   * @returns IResponse
   * @param lesson_id
   */
  @Get('/:lesson_id')
  async getLessonById(
    @PathParams('lesson_id') lesson_id: number,
  ): Promise<IResponse> {
    // const offset = ((page - 1) * limit);

    return {
      status: 200,
      message: 'Student list retrieved successfully',
      details: {
        lesson: await this.lessonService.getLessonById(lesson_id)
      }
    };
  }
}
