import {
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  Put,
  QueryParams,
} from '@tsed/common';
import { MultipartFile } from '@tsed/multipartfiles';
import { ContentType } from '@tsed/schema';

import { SubjectService } from '../services/SubjectService';
import { LessonService } from '../services/LessonService';

/**
 * Controller for student api
 */
@Controller('/:subject_id/lessons')
@ContentType('application/json')
export class LessonController {
  constructor(
    private lessonService: LessonService,
    private subjectService: SubjectService
  ) {}

  /**
   * Get all students
   *
   * @param page
   * @param limit
   * @returns IResponse
   */
  @Get()
  async getLessons(
    @PathParams('subject_id') subject_id: number,
    @QueryParams('page') page: number,
    @QueryParams('limit') limit: number,
    @QueryParams('search') search: string
  ): Promise<IResponse> {
    const offset = ((page - 1) * limit);

    const [lessons, count] = await this.lessonService.getLessons(subject_id, offset, limit, search || '');

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
    @PathParams('subject_id') subject_id: number,
    @PathParams('lesson_id') lesson_id: number,
  ): Promise<IResponse> {
    // const offset = ((page - 1) * limit);

    return {
      status: 200,
      message: 'Student list retrieved successfully',
      details: {
        lesson: await this.lessonService.getLessonById(subject_id, lesson_id)
      }
    };
  }

  @Post()
  public async addLesson(
    @MultipartFile('file') file: Express.Multer.File,
    @BodyParams('subject_id') subject_id: string,
    @BodyParams('title') title: string,
    @BodyParams('description') description: string
  ): Promise<IResponse> {

    const subject = await this.subjectService.getSubjectByID(parseInt(subject_id));

    if (!subject) {
      return {
        status: 200,
        message: 'Subject ID not found',
      };
    }

    const response = await this.lessonService.addLesson({
      subject_id: subject,
      title, 
      description, 
      file
    });

    return {
      status: 200,
      message: 'Student successfully added',
      details: {
        lesson: response
      }
    };
  }

  @Put('/:lesson_id')
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

  /**
   * Entry point for editing student
   *
   * @param student_id
   * @returns IResponse
   */
  @Delete('/:lesson_id')
  async deleteStudent(
    @PathParams('lesson_id') lesson_id: ILesson['lesson_id'],
  ): Promise<IResponse> {
    await this.lessonService.deleteLesson(lesson_id);

    return {
      status: 200,
      message: 'Successfully successfully deleted',
    };
  }
}
