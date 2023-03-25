import { OfficeModel } from "../models/exportModels";

import { Request} from "express";

export function createNewOffice(input: any){
    return OfficeModel.create(input)
}


export function findOffice(){
    return OfficeModel.find();
}


export function findOfficeById(id: string){
    return OfficeModel.findById(id);
}


export function findOfficeByIdAndDelete(id: string){
    return OfficeModel.findById(id);
}

