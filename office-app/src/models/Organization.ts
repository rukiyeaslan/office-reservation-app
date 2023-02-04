// NOT USING THIS AFTER TYPEGOOSE IMPLEMENTATION
// GOTO: ./Models.ts
import mongoose, {Document, Schema} from 'mongoose';

export interface IOrganization{
    name: string,
}

export interface IOrganizationModel extends IOrganization, Document{}

const OrganizationSchema: Schema = new Schema(
    {
        name: { type: String, required: true},
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IOrganizationModel>('Organization', OrganizationSchema);