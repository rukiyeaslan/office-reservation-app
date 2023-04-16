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
  
    // @prop({ required: true, default: false, })
    // reserved: boolean;

    // 1: 9-10, 2: 10-11, 3: 11-12, 4: 12- 13, 5: 13-14, 6: 14-15, 7: 15-16, 8: 16-17, 
    @prop({required: true, default: ['1', '2', '3', '4', '5','6','7', '8', ]})
    availableSlots: string[];

    @prop({  default: null })
    reservationStartTime: Date | null;

    @prop({  default: null })
    reservationEndTime: Date | null; 
//TODO: ref 
    @prop({ required: true, ref: () => Office})
    office: Ref<typeof Office>;
  
    @prop({ required: true, ref: () => Organization})
    organization: Ref<typeof Organization>;
}

const DeskModel = getModelForClass(Desk);

export default DeskModel;


