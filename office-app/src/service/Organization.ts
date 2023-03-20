import { OrganizationModel, Organization } from "../models/Models";
import { Request} from "express";

export function createNewOrganization(req: Request){
    return new OrganizationModel({
        ...req.body
    });;
} 


export function findOrganization(){
    return OrganizationModel.find();
}


export function findOrganizationById(id: string){
    return OrganizationModel.findById(id);
}


export function findOrganizationByIdAndDelete(id: string){
    return OrganizationModel.findById(id);
}