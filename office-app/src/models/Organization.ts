import {
    getModelForClass,
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
    //TODO: name unique only in tha same office
    @prop({ required: true, unique: true })
    name: string;
  
    // @prop({ ref: () => Office})
    // offices: Ref<Office>[];

}



  const OrganizationModel = getModelForClass(Organization);
  
  export default OrganizationModel;