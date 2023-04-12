import {
    modelOptions,
    prop,
    Severity,
    Ref,
  } from "@typegoose/typegoose";
import { Office } from "./Office";

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

export class Organization {
    @prop({ required: true, unique: true })
    name: string;
  
    @prop({ ref: () => 'Office', type: () => String})
    offices?: Ref<Office>[];

}
