/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import { IResult } from '../../../../../../../packages/domain';
import { MatchDTO } from '../dtos';
import { Match } from '../../domain';

class CreateResultData {
    @ApiProperty({ type: MatchDTO })
    public readonly match: MatchDTO;

    constructor(match: MatchDTO) {
        this.match = match;
    }
}

export class CreateResult implements IResult<CreateResult['data'], null> {
    @ApiProperty({
        type: CreateResultData
    })
    data: CreateResultData;

    @ApiProperty({ type: 'null', default: null })
    error: null;

    private constructor(data: CreateResult['data'], error: null) {
        this.data = data;
        this.error = error;
    }

    static create(match: Match) {
        const data = new CreateResultData(MatchDTO.create(match));

        return new this(data, null);
    }
}
