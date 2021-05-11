import {Inject, Middleware} from '@tsed/common';
import { UseConnection } from '@tsed/typeorm';
import { TypeormStore } from 'connect-typeorm/out';
import session from 'express-session';
import { SessionRepository } from 'src/repository/SessionRepository';

@Middleware()
export class SessionStoreMiddleware {
  constructor(
    @Inject()
    @UseConnection('default')
    private sessionRepository: SessionRepository
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  use() {
    // console.log('GG?');
    return session({
      resave: false,
      saveUninitialized: false,
      secret: 'mysecretkey',
      store: new TypeormStore({
        cleanupLimit: 2,
        // limitSubquery: false, // If using MariaDB.
        ttl: 86400
      }).connect(this.sessionRepository),
    });
  }
}