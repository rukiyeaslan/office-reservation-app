import { DeskModel, Desk } from "../models/Models";

import { Request} from "express";

export function createNewDesk(req: Request){
    return new DeskModel({
        ...req.body
    });;
} 


export function findDesk(){
    return DeskModel.find();
}


export function findDeskById(id: string){
    return DeskModel.findById(id);
}


export function findDeskByIdAndDelete(id: string){
    return DeskModel.findById(id);
}