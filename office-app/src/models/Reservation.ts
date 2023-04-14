import { prop, getModelForClass } from '@typegoose/typegoose';

class Reservation {
  @prop({ required: true })
  userId!: string;

  @prop({ required: true })
  officeId!: string;

  @prop({ type: () => [String], required: true })
  slots!: string[];

  @prop({ required: true, default: Date.now })
  createdAt!: Date;

  @prop({ default: null })
  updatedAt?: Date;
}

const ReservationModel = getModelForClass(Reservation);

export { Reservation, ReservationModel };