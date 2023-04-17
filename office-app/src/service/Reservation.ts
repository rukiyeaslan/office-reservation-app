import ReservationModel, { Reservation } from "../models/Reservation";
import { QueryOptions } from "mongoose";
import { findAndUpdateDesk, findDeskById } from "./Desk";
import { RequestBody } from "swagger-jsdoc";
import { fill } from "lodash";

export async function createReservation(input: Partial<Reservation>, body: RequestBody){

    const deskId = body.deskId;
    let desk =  await findDeskById(deskId);
    const fillSlots = body.slots;
    const newSlots = desk!.availableSlots.filter((slot: any) => !fillSlots.includes(slot));

    desk!.availableSlots = newSlots;
    desk!.markModified('availableSlots');
    desk!.save();         //TODO: check the !

    return ReservationModel.create(input)
}


export function findReservation(){
    return ReservationModel.find();
}


export function findReservationById(id: string){
    return ReservationModel.findById(id);
}


export function findReservationByIdAndDelete(id: string){
    return ReservationModel.findByIdAndRemove(id);
}


export async function findAndUpdateReservation(
    filter: object,  
    update: object,
    options: QueryOptions
  ) {
    return ReservationModel.findOneAndUpdate(filter, update, options);
}
