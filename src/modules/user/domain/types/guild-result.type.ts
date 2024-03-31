import { Result } from 'neverthrow';
import { UserGuidInvalidException } from '../exceptions/user.exception';
import { GuidVO } from '../value-objects/guid.vo';

export type GuidResult = Result<GuidVO, UserGuidInvalidException>