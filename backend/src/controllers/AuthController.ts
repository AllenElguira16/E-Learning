import { Controller, Get, Post, ProviderScope, Scope } from '@tsed/common';
import { Authenticate, Authorize } from '@tsed/passport';
import { ContentType } from '@tsed/schema';
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
  @Authenticate('login')
  public async login(): Promise<IResponse> {
    return {
      status: 200,
      message: 'Success',
    };
  }

  @Get()
  @Authorize()
  public async getAuthenticatedStudent(): Promise<string> {
    return 'gg';
  }
}
