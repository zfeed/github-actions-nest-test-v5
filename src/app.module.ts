import { Module } from '@nestjs/common';
import { GamingModule } from './contexts/gaming';
import { BettingModule } from './contexts/betting';

@Module({
    imports: [GamingModule, BettingModule]
})
export class AppModule {}
