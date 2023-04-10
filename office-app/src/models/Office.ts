import {
    modelOptions,
    prop,
    Severity,
    Ref,
  } from "@typegoose/typegoose";

import { Organization } from "./Organization";
import Desk from "./Desk";

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
    //TODO: name unique only in the same organization
    @prop({ required: true, unique: true })
    name: string;

    //TODO:refleri azalt
    @prop({ required: true, ref: () => typeof Desk})
    desks: Ref<typeof Desk>[];
  
    @prop({ required: true, ref: () =>typeof Organization})
    organization: Ref<typeof Organization>;
  
  }
  