import OrganizationModel, { Organization } from "../models/Organization";
import { Request} from "express";

export function createNewOrganization(input: Partial<Organization>){
    return OrganizationModel.create(input)
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