import {
    getModelForClass,
    modelOptions,
    prop,
    Severity,
    Ref,
  } from "@typegoose/typegoose";

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
    name: string;
  
    @prop({ required: true, default: false, })
    reserved: boolean;

    @prop({ required: true, default: false, })
    reservationStartTime: Date | null;

    @prop({ required: true, default: false, })
    reservationEndTime: Date | null;

    @prop({ required: true, ref: () => Office})
    office: Ref<Office>;
  
    @prop({ required: true, ref: () => Organization})
    organization: Ref<Organization>;
  
    @prop({ default: false })
    verified: boolean;
  
  }
  
  const DeskModel = getModelForClass(Desk);
  
  export default DeskModel;