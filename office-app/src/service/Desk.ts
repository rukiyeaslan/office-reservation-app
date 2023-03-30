import DeskModel, { Desk } from "../models/Desk";
import { Request} from "express";
import { QueryOptions } from "mongoose";


export function createDesk(input: Partial<Desk>){
    return DeskModel.create(input)
}

export function findDesk(){
    return DeskModel.find();
}


export function findDeskById(id: string){
    return DeskModel.findById(id);
}


export function findDeskByIdAndDelete(id: string){
    return DeskModel.findByIdAndRemove(id);
}


export async function findAndUpdateDesk(
    filter: object,  
    update: object,
    options: QueryOptions
  ) {
    return DeskModel.findOneAndUpdate(filter, update, options);
}

