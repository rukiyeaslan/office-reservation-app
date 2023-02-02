import mongoose, {Document, Schema} from 'mongoose';

export interface IDesk{
    name: string,
    isReserved: boolean,
    office: string,
    reservation_start_time: Date,
    reservation_end_time: Date
}

export interface IDeskModel extends IDesk, Document{}

const DeskSchema: Schema = new Schema(
    {
        name: { type: String, required: true},
        isReserved: {type: Boolean, required: true},
        office: {type: String, required: true, ref: 'Office'},
        reservation_start_time: {type: Date},
        reservation_end_time: {type :Date}
    },
    {
        //TODO: revise this line
        versionKey: false
        //versionKey allows to test if changes have been made
        //So, not sure if I should disable it
    }
);

export default mongoose.model<IDeskModel>('Desk', DeskSchema);