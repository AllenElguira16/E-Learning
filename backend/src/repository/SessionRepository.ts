import { EntityRepository, Repository } from 'typeorm';

import { Session } from 'src/entity/Session';
// import { Lesson } from '../entity/Lesson';

/**
 * Student Repository
 */
@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {}
