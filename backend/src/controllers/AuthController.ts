import { BodyParams, Controller, Get, Post, ProviderScope, Scope, Session } from '@tsed/common';
import { ContentType } from '@tsed/schema';
import { decodeID } from 'src/helpers';
import { StudentService } from 'src/services/StudentService';

/**
 * Controller for student api
 */
@Controller('/auth')
@ContentType('application/json')
@Scope(ProviderScope.SINGLETON)
export class AuthController {
  constructor(private studentService: StudentService) { }

  @Post('/login')
  // @Authenticate('login')
  public async login(
    @BodyParams('school_id') school_id: string,
    @BodyParams('password') password: string,
    @Session() session: TSession
  ): Promise<IResponse> {

    const decodedID = decodeID(school_id);
    
    const student = await this.studentService.getStudentByID(decodedID);
    console.log(student);

    if (!student) {
      throw new Error('School ID is incorrect!');
    }

    if (student?.password === null) {
      if (school_id !== password) {
        throw new Error('Password is incorrect!');
      }
    }

    session.student = student;

    return {
      status: 200,
      message: 'Success',
      details: {
        student
      }
    };
  }

  @Get('/logout')
  // @Authorize()
  public async logout(@Session() session: TSession): Promise<IResponse> {

    // req.logout();

    delete session.student;

    return {
      status: 200,
      message: 'Success',
    };
  }

  @Get()
  // @Authorize()
  public async getAuthenticatedStudent(@Session() session: TSession): Promise<IResponse> {
    if (!session.student) {
      throw new Error('User not authenticated');
    }

    return {
      status: 200,
      message: 'Success',
      details: {
        student: session.student
      }
    };
  }
}
