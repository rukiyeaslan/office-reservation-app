import {
    getModelForClass,
    modelOptions,
    prop,
    Severity,
    Ref,
  } from "@typegoose/typegoose";
import { Schema } from "mongoose";

import { Office, Organization } from "./Models";
export const privateFields = [
    "__v",
  ];

@modelOptions({
    schemaOptions: {
      timestamps: true,
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })
export class Desk {
    //TODO: name unique only in tha same office
    @prop({ required: true, unique: true })
    name!: string;
  
    @prop({ required: true, default: false, })
    reserved!: boolean;

    @prop({ required: true, default: false, })
    reservationStartTime?: Date | null;

    @prop({ required: true, default: false, })
    reservationEndTime?: Date | null;

    @prop({ required: true, ref: () => Office})
    office!: Ref<Office>;
  
    @prop({ required: true, ref: () => Organization})
    organization!: Ref<Organization>;

}

const deskSchema = new Schema({
  name: { type: String, required: true },
  organization: { type: String, required: true },
  office: { type: String, required: true },
  reserved: { type: Boolean, default: false },
  reservationStartTime: { type: Date },
  reservationEndTime: { type: Date }
});

  const DeskModel = getModelForClass(Desk);
  
  export default DeskModel;