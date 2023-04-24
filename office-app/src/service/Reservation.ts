import ReservationModel, { Reservation } from "../models/Reservation";
import { QueryOptions } from "mongoose";
import { OfficeModel } from "../models/exportModels";
import DeskModel from "../models/Desk";
import { findOfficeById } from "./Office";

export async function createReservation(input: Partial<Reservation>){
    return ReservationModel.create(input)
}


export function findReservation(){
    return ReservationModel.find();
}


export function findReservationById(id: string){
    return ReservationModel.findById(id);
}

export async function getReservations(day: string, officeId: string){

    const allReservations = await ReservationModel.find({day, officeId});
    const reservationsOfDay = [];
    for(let res=0; res< allReservations .length; res++){
        reservationsOfDay.push(allReservations [res].deskId);
    }

    console.log(reservationsOfDay);
    return reservationsOfDay;
}


export function findReservationByIdAndDelete(id: string){
    return ReservationModel.findByIdAndRemove(id);
}



