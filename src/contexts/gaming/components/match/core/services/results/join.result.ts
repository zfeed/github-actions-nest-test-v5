/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';

import { IResult } from '../../../../../../../packages/domain';
import { MatchDTO, PlayerDTO } from '../dtos';
import { Match, Player } from '../../domain';

const MATCH_NOT_FOUND = 'MATCH_NOT_FOUND' as const;
type MATCH_NOT_FOUND = typeof MATCH_NOT_FOUND;

class MatchNotFoundError {
    @ApiProperty({ type: 'string', default: MATCH_NOT_FOUND })
    id = MATCH_NOT_FOUND;

    @ApiProperty({ type: 'string' })
    message = 'Match not found';
}

export class MatchNotFoundResult
    implements IResult<null, MatchNotFoundResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data: null;

    @ApiProperty()
    error: MatchNotFoundError;

    private constructor(data: null, error: MatchNotFoundResult['error']) {
        this.data = data;
        this.error = error;
    }

    static create() {
        return new this(null, new MatchNotFoundError());
    }
}

class MatchJoinedResultData {
    @ApiProperty({ type: MatchDTO })
    match: MatchDTO;

    @ApiProperty({ type: PlayerDTO })
    player: PlayerDTO;

    constructor(match: MatchDTO, player: PlayerDTO) {
        this.match = match;
        this.player = player;
    }
}

export class MatchJoinedResult
    implements IResult<MatchJoinedResult['data'], null>
{
    @ApiProperty({ type: MatchJoinedResultData })
    data: MatchJoinedResultData;

    @ApiProperty({ type: 'null', default: null })
    error: null;

    private constructor(data: MatchJoinedResult['data'], error: null) {
        this.data = data;
        this.error = error;
    }

    static create(match: Match, player: Player) {
        const data = new MatchJoinedResultData(
            MatchDTO.create(match),
            PlayerDTO.create(player)
        );
        return new this(data, null);
    }
}

const MATCH_ALREADY_STARTED = 'MATCH_ALREADY_STARTED' as const;
type MATCH_ALREADY_STARTED = typeof MATCH_ALREADY_STARTED;

class MatchAlreadyStartedError {
    @ApiProperty({ type: 'string', default: MATCH_ALREADY_STARTED })
    id = MATCH_ALREADY_STARTED;

    @ApiProperty({ type: 'string' })
    message = 'Match has been already started';
}

export class MatchAlreadyStartedResult
    implements IResult<null, MatchAlreadyStartedResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data: null;

    @ApiProperty({ type: MatchAlreadyStartedError })
    error: MatchAlreadyStartedError;

    private constructor(data: null, error: MatchAlreadyStartedResult['error']) {
        this.data = data;
        this.error = error;
    }

    static create() {
        return new this(null, new MatchAlreadyStartedError());
    }
}

const MATCH_IS_FULL = 'MATCH_IS_FULL' as const;
type MATCH_IS_FULL = typeof MATCH_IS_FULL;

class MatchIsFullError {
    @ApiProperty({ type: 'string', default: MATCH_IS_FULL })
    id = MATCH_IS_FULL;

    @ApiProperty({ type: 'string' })
    message = 'Max number of playes has been already joined the match';
}

export class MatchIsFullResult
    implements IResult<null, MatchIsFullResult['error']>
{
    @ApiProperty({ type: 'null', default: null })
    data: null;

    @ApiProperty({ type: MatchIsFullError })
    error: MatchIsFullError;

    private constructor(data: null, error: MatchIsFullResult['error']) {
        this.data = data;
        this.error = error;
    }

    static create() {
        return new this(null, new MatchIsFullError());
    }
}
