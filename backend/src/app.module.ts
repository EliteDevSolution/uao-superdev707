import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventSchema } from './schema/event.schema';
import { EventService } from './event/event.service';
import { EventController } from './event/event.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'calendar_event_db',
    }),
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
  controllers: [AppController, EventController],
  providers: [AppService, EventService],
})
export class AppModule {}
