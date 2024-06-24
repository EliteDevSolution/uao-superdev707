import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateEventDto } from 'src/dto/create-event.dto';
import { UpdateEventDto } from 'src/dto/update-event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  async createEvent(
    @Res() response,
    @Body() CreateEventDto: CreateEventDto,
  ) {
    try {
      const newEvent = await this.eventService.createEvent(
        CreateEventDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Event has been created successfully',
        newEvent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Event not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateEvent(
    @Res() response,
    @Param('id') eventId: string,
    @Body() UpdateEventDto: UpdateEventDto,
  ) {
    try {
      const existingEvent = await this.eventService.updateEvent(
        eventId,
        UpdateEventDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Event has been successfully updated',
        existingEvent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getEvents(@Res() response) {
    try {
      const eventData = await this.eventService.getAllEvents();
      return response.status(HttpStatus.OK).json({
        message: 'All Events data found successfully',
        eventData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getEvent(@Res() response, @Param('id') eventId: string) {
    try {
      const existingEvent = await this.eventService.getEvent(eventId);
      return response.status(HttpStatus.OK).json({
        message: 'Event found successfully',
        existingEvent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteEvent(@Res() response, @Param('id') eventId: string) {
    try {
      const deletedEvent = await this.eventService.deleteEvent(eventId);
      return response.status(HttpStatus.OK).json({
        message: 'Event deleted successfully',
        deletedEvent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
