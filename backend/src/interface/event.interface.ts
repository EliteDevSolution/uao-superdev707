import { Document } from 'mongoose';
export interface IEvent extends Document {
  readonly start_date: string;
  readonly end_date: string;
  readonly title: string;
  readonly price: number;
}
