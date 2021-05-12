import { EntityRepository, Repository } from 'typeorm';

import { Session } from '~entities/Session';
// import { Lesson } from '../entity/Lesson';

/**
 * Student Repository
 */
@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {}
