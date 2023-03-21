import {
    getModelForClass,
    modelOptions,
    prop,
    Severity,
    Ref,
  } from "@typegoose/typegoose";

import { Desk, Organization } from "./Models";
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
export class Office {
    //TODO: name unique only in tha same organization
    @prop({ required: true, unique: true })
    name: string;

    @prop({ required: true, ref: () => Desk})
    desks: Ref<Desk>[];
  
    @prop({ required: true, ref: () => Organization})
    organization: Ref<Organization>;
  
  }
  
  const OfficeModel = getModelForClass(Office);
  
  export default OfficeModel;