import {
  BodyParams,
  Controller,
  Get,
  PathParams,
  Post,
  Put,
  QueryParams,
} from '@tsed/common';
import { MultipartFile } from '@tsed/multipartfiles';
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

    const [lessons, count] = await this.lessonService.getLessons(offset, limit);

    return {
      status: 200,
      message: 'Student list retrieved successfully',
      details: {
        total_pages: Math.ceil(count / limit),
        lessons
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

  @Post('/upload')
  public async addLesson(
    @MultipartFile('file') file: Express.Multer.File,
    @BodyParams('title') title: string,
    @BodyParams('description') description: string
  ): Promise<IResponse> {

    const response = await this.lessonService.addLesson(title, description, file);

    return {
      status: 200,
      message: 'Student successfully added',
      details: {
        lesson: response
      }
    };
  }

  @Put('/upload/:lesson_id')
  public async editLesson(
    @MultipartFile('file') file: Express.Multer.File,
    @BodyParams('title') title: string,
    @BodyParams('description') description: string,
    @PathParams('lesson_id') lesson_id: string
  ): Promise<IResponse> {

    const response = await this.lessonService.editLesson(parseInt(lesson_id), title, description, file);

    return {
      status: 200,
      message: 'Student successfully updated',
      details: {
        lesson: response
      }
    };
  }
}
