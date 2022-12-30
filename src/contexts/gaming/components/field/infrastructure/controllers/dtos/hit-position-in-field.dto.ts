import { randomUUID } from 'node:crypto';
import { ApiProperty } from '@nestjs/swagger';

import { FIELD_SIZE } from '../../../core/constants';

export class HitPositionInFieldDTO {
    @ApiProperty({
        example: 7,
        minimum: 0,
        maximum: FIELD_SIZE - 1,
        description: `Cell position to be hit in the field`
    })
    index!: number;

    @ApiProperty({
        example: randomUUID(),
        description:
            'Player identification that can be either achieved by joining or creating a match'
    })
    playerId!: string;
}
