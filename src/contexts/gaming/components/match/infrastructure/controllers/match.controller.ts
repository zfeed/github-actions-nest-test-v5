import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiExtraModels, refs } from '@nestjs/swagger';
import { MatchService } from '../../core/services';
import { CreateMatchDTO, JoinMatchDTO } from './dtos';
import { CreateResult } from '../../core/services/results/create.result';
import * as JoinResult from '../../core/services/results/join.result';

@Controller('match')
@ApiExtraModels(
    JoinResult.MatchNotFoundResult,
    JoinResult.MatchJoinedResult,
    JoinResult.MatchAlreadyStartedResult,
    JoinResult.MatchIsFullResult
)
export class MatchController {
    constructor(private matchService: MatchService) {}

    @ApiResponse({ type: CreateResult })
    @Post()
    createMatch(@Body() body: CreateMatchDTO) {
        return this.matchService.create(body.playerName);
    }

    @ApiResponse({
        schema: {
            anyOf: refs(
                JoinResult.MatchJoinedResult,
                JoinResult.MatchNotFoundResult,
                JoinResult.MatchAlreadyStartedResult,
                JoinResult.MatchIsFullResult
            )
        }
    })
    @ApiParam({
        name: 'id',
        description: 'Match id that can be received by match creation'
    })
    @Post(':id/join')
    join(@Body() body: JoinMatchDTO, @Param('id') id: string) {
        return this.matchService.join(body.playerName, id);
    }
}
