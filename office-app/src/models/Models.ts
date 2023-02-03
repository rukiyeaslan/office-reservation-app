import { prop, modelOptions, Ref, getModelForClass } from '@typegoose/typegoose';
import mongoose from 'mongoose';

@modelOptions({ schemaOptions: { collection: 'organizations' } })
export class Organization {
  @prop({required: true})
  name!: string;

  @prop()
  description?: string;

  @prop()
  location?: string;

  @prop({ default: [] })
  offices!: Ref<Office>[];

  constructor(name: string, description: string, location: string, offices: Ref<Office>[]) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.offices = offices;
  }
}

@modelOptions({ schemaOptions: { collection: 'offices' } })
export class Office {
  @prop({required: true})
  name!: string;

  @prop()
  description?: string;

  @prop()
  location?: string;

  @prop({ required: true, ref: () => Organization })
  organization!: Ref<Organization>;

  @prop({ default: [] })
  desks!: Ref<Desk>[];


  constructor(name: string, description: string, location: string, organization: Ref<Organization>, desks: Ref<Desk>[]) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.organization = organization;
    this.desks = desks;
  }
}

@modelOptions({ schemaOptions: { collection: 'desks' } })
export class Desk {
  @prop({required: true})
  name!: string;

  @prop()
  description?: string;

  @prop()
  location?: string;

  @prop({ required: true, enum: ['available', 'reserved'] })
  status!: string;

  @prop()
  reservation_start_time?: Date;

  @prop()
  reservation_end_time?: Date;

  @prop({ required: true, ref: () => Office})
  office!: Ref<Office>;

  constructor(
    name: string,
    description: string,
    location: string,
    status: string,
    reservation_start_time: Date,
    reservation_end_time: Date,
    office: Ref<Office>,
  ) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.status = status;
    this.reservation_start_time = reservation_start_time;
    this.reservation_end_time = reservation_end_time;
    this.office = office;
  }
}

export const DeskModel = getModelForClass(Desk);
export const OfficeModel = getModelForClass(Office);
export const OrganizationModel = getModelForClass(Organization);

// export default {DeskModel, OfficeModel, OrganizationModel};