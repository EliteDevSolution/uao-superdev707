import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Event {
  @Prop()
  start_date: string;

  @Prop()
  end_date: string;

  @Prop()
  title: string;

  @Prop()
  price: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
