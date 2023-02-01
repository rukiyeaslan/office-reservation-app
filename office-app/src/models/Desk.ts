import mongoose, {Document, Schema} from 'mongoose';

export interface IDesk{
    name: string,
    office: string
}

export interface IDeskModel extends IDesk, Document{}

const DeskSchema: Schema = new Schema(
    {
        name: { type: String, required: true},
        office: { type: String, required: true, ref: 'Office'}
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IDeskModel>('Desk', DeskSchema);