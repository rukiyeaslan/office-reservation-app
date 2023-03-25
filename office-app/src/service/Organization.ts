import  { Organization } from "../models/Organization";
import { OrganizationModel } from "../models/exportModels";
import { Request} from "express";

import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
export function createNewOrganization(input: any){
    return OrganizationModel.create(input)
}


export function findOrganization(){
    return OrganizationModel.find();
}


export function findOrganizationById(id: string){
    console.log( OrganizationModel.findById(id));
    return OrganizationModel.findById(id);
}


export async function findAndUpdateOrganization(
    filter:object,  
    update: object,
    options: QueryOptions
  ) {
    return OrganizationModel.findOneAndUpdate(filter, update, options);
  }

export function findOrganizationByIdAndDelete(id: string){
    return OrganizationModel.findByIdAndRemove(id);
}