import {
    getModelForClass,
    modelOptions,
    prop,
    Severity,
    Ref,
  } from "@typegoose/typegoose";
import {Office} from "./Office";
import { Organization } from "./Organization";

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
    //TODO: name unique only in the same office
    @prop({ required: true, unique: true })
    name: string;

    @prop({ required: true, ref: () => Office})
    office: Ref<typeof Office>;
  
    @prop({ required: true, ref: () => Organization})
    organization: Ref<typeof Organization>;
}

const DeskModel = getModelForClass(Desk);

export default DeskModel;


