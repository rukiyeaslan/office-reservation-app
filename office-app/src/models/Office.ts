// NOT USING THIS AFTER TYPEGOOSE IMPLEMENTATION
// GOTO: ./Models.ts
import mongoose, {Document, Schema} from 'mongoose';

export interface IOffice{
    name: string,
    organization: string
}

export interface IOfficeModel extends IOffice, Document{}

const OfficeSchema: Schema = new Schema(
    {
        name: { type: String, required: true},
        organization: { type: String, required: true, ref: 'Organization'}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IOfficeModel>('Office', OfficeSchema);