import { QueryOptions } from "mongoose";
import { OfficeModel } from "../models/exportModels";


export function createNewOffice(input: any){
    return OfficeModel.create(input)
}


export function findOffice(){
    return OfficeModel.find();
}


export function findOfficeById(id: string){
    return OfficeModel.findById(id);
}

export async function findAndUpdateOffice(
    filter:object,  
    update: object,
    options: QueryOptions
  ) {
    return OfficeModel.findOneAndUpdate(filter, update, options);
  }

export function findOfficeByIdAndDelete(id: string){
    return OfficeModel.findByIdAndRemove(id);
}
