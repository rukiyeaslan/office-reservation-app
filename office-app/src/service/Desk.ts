import DeskModel, { Desk } from "../models/Desk";
import { Request} from "express";


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
    return DeskModel.findById(id);
}