import { OfficeModel } from "../models/exportModels";

import { Request} from "express";

export function createNewOffice(req: Request){
    return new OfficeModel({
        ...req.body
    });;
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

