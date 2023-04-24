import { prop, getModelForClass } from '@typegoose/typegoose';

export class Reservation {

  @prop({ required: true })
  day!: string;

  @prop({ required: true })
  userId!: string;

  @prop({ required: true })
  deskId!: string;

  @prop({ required: true })
  officeId!: string;
  
  @prop({ required: true, default: Date.now })
  createdAt?: Date;

  @prop({ default: null })
  updatedAt?: Date;
}

const ReservationModel = getModelForClass(Reservation);

export default ReservationModel;