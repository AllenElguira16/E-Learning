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
import { ContentType } from '@tsed/schema';
import { SubjectService } from 'src/services/SubjectService';
import { LessonController } from './LessonController';

/**
 * Controller for student api
 */
@Controller({
  path: '/subjects',
  children: [LessonController]
})
@ContentType('application/json')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  /**
   * Get all students
   *
   * @param page
   * @param limit
   * @returns IResponse
   */
  @Get()
  async getSubjects(
    @QueryParams('page') page: number,
    @QueryParams('limit') limit: number,
    @QueryParams('search') search: string
  ): Promise<IResponse> {
    const offset = ((page - 1) * limit);

    const [subjects, count] = await this.subjectService.getSubjects(offset, limit, search || '');

    return {
      status: 200,
      message: 'Student list retrieved successfully',
      details: {
        total_pages: Math.ceil(count / limit),
        subjects
      }
    };
  }

  /**
   * Get all students
   *
   * @param page
   * @param limit
   * @returns IResponse
   */
  @Get('/:subject_id')
  async getSubjectsByID(
    @PathParams('subject_id') subject_id: number,
  ): Promise<IResponse> {

    const subject = await this.subjectService.getSubjectByID(subject_id);

    return {
      status: 200,
      message: 'Student list retrieved successfully',
      details: {
        subject
      }
    };
  }

  @Post()
  public async addSubject(
    @BodyParams('title') title: string,
    @BodyParams('description') description: string
  ): Promise<IResponse> {

    const response = await this.subjectService.addSubject({ 
      title, 
      description
    });

    return {
      status: 200,
      message: 'Subject successfully added',
      details: {
        subject: response
      }
    };
  }

  @Put()
  public async editSubject(
    @BodyParams('subject_id') subject_id: string,
    @BodyParams('title') title: string,
    @BodyParams('description') description: string,
  ): Promise<IResponse> {

    const response = await this.subjectService.editSubject(parseInt(subject_id), { 
      title, 
      description
    });

    return {
      status: 200,
      message: 'Subject successfully updated',
      details: {
        subject: response
      }
    };
  }

  @Delete('/:subject_id')
  public async deleteSubject(
    @PathParams('subject_id') subject_id: string,
  ): Promise<IResponse> {

    const response = await this.subjectService.deleteSubject(parseInt(subject_id));

    return {
      status: 200,
      message: 'Subject successfully added',
      details: {
        subject: response
      }
    };
  }
}
