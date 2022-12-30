/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import { IResult } from '../../../../../../../packages/domain';
import { FieldDTO } from './dtos';
import { Field } from '../../domain/field';

class HitResultData {
    @ApiProperty({ type: FieldDTO })
    public readonly field: FieldDTO;

    constructor(field: FieldDTO) {
        this.field = field;
    }
}

export class HitResult implements IResult<HitResult['data'], null> {
    @ApiProperty({ type: HitResultData })
    data: HitResultData;

    @ApiProperty({ type: 'null', default: null })
    error = null;

    private constructor(data: HitResult['data']) {
        this.data = data;
    }

    static create(field: Field) {
        return new this({ field: FieldDTO.create(field) });
    }
}

const FIELD_NOT_FOUND = 'FIELD_NOT_FOUND' as const;
type FIELD_NOT_FOUND = typeof FIELD_NOT_FOUND;

class FieldNotFoundError {
    @ApiProperty({ type: 'string', default: FIELD_NOT_FOUND })
    id = FIELD_NOT_FOUND;

    @ApiProperty({ type: 'string' })
    message = 'Field is not found';
}

export class FieldNotFoundResult
    implements IResult<null, FieldNotFoundResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data = null;

    @ApiProperty({ type: FieldNotFoundError })
    error = new FieldNotFoundError();

    static create() {
        return new this();
    }
}

const MATCH_IS_OVER = 'MATCH_IS_OVER' as const;
type MATCH_IS_OVER = typeof MATCH_IS_OVER;

class MatchIsOverError {
    @ApiProperty({ type: 'string', default: MATCH_IS_OVER })
    id = MATCH_IS_OVER;

    @ApiProperty({ type: 'string' })
    message = 'Match is over';
}

export class MatchIsOverResult
    implements IResult<null, MatchIsOverResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data = null;

    @ApiProperty({ type: MatchIsOverError })
    error = new MatchIsOverError();

    static create() {
        return new this();
    }
}

const PLAYER_DOES_NOT_EXIST = 'PLAYER_DOES_NOT_EXIST' as const;
type PLAYER_DOES_NOT_EXIST = typeof PLAYER_DOES_NOT_EXIST;

class PlayerDoesNotExistError {
    @ApiProperty({ type: 'string', default: PLAYER_DOES_NOT_EXIST })
    id = PLAYER_DOES_NOT_EXIST;

    @ApiProperty({ type: 'string' })
    message = 'Match is over';
}

export class PlayerDoesNotExistResult
    implements IResult<null, PlayerDoesNotExistResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data = null;

    @ApiProperty({ type: PlayerDoesNotExistError })
    error = new PlayerDoesNotExistError();

    static create() {
        return new this();
    }
}
