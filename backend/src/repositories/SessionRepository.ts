import { EntityRepository, Repository } from 'typeorm';

import { Session } from '../entities/Session';

/**
 * Student Repository
 */
@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {}
