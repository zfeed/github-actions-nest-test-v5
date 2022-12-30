import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiParam, ApiExtraModels, ApiResponse, refs } from '@nestjs/swagger';

import { FieldService } from '../../core/services';
import { HitPositionInFieldDTO } from './dtos';
import * as HitResult from '../../core/services/results/hit.result';

@Controller('field')
@ApiExtraModels(
    HitResult.HitResult,
    HitResult.FieldNotFoundResult,
    HitResult.MatchIsOverResult,
    HitResult.PlayerDoesNotExistResult
)
export class FieldController {
    constructor(private fieldService: FieldService) {}

    @ApiResponse({
        schema: {
            anyOf: refs(
                HitResult.HitResult,
                HitResult.FieldNotFoundResult,
                HitResult.MatchIsOverResult,
                HitResult.PlayerDoesNotExistResult
            )
        }
    })
    @ApiParam({
        name: 'id',
        description:
            'Field identification that is automatically sent to all players once all players joined the match'
    })
    @Post(':id/hit')
    hit(@Body() body: HitPositionInFieldDTO, @Param('id') id: string) {
        return this.fieldService.hit(id, body.index, body.playerId);
    }
}
