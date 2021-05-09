import {Middleware, Req} from '@tsed/common';

type TSession = { 
  student: IStudent 
}

@Middleware()
export class CreateRequestSessionMiddleware {
  use(@Req() request: Req): void {
    if (request.session) {
      (request.session as unknown as TSession).student = (request.session as unknown as TSession).student || null;
    }
  }
}