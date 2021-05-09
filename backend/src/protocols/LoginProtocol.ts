import {BodyParams, Req} from '@tsed/common';
import {OnInstall, OnVerify, Protocol} from '@tsed/passport';
import {Strategy, IStrategyOptions} from 'passport-local';
import { decodeID } from 'src/helpers';
import { StudentService } from 'src/services/StudentService';
// import {AuthService} from '../services/auth/AuthService';

@Protocol<IStrategyOptions>({
  name: 'login',
  useStrategy: Strategy,
  settings: {
    usernameField: 'school_id',
    passwordField: 'password'
  }
})
export class JwtProtocol implements OnVerify, OnInstall {
  constructor(private studentService: StudentService) { }

  async $onVerify(
    @Req() req: Req, 
    @BodyParams('school_id') school_id: string,
    @BodyParams('password') password: string,
  ): Promise<IStudent> {
    const decodedID = decodeID(school_id);
    
    const student = await this.studentService.getStudentByID(decodedID);

    if (!student) {
      throw new Error('School ID is incorrect!');
    }

    if (student?.password === null) {
      if (school_id !== password) {
        throw new Error('Password is incorrect!');
      }
    }
    // const user = await this.authService.findOne({id: jwtPayload.sub});

    return student;
  }

  $onInstall(strategy: Strategy): void {
    console.log(strategy);
  }
}