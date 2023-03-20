import { OrganizationModel, Organization } from "../models/Models";

export function findOfficeById(id: string){
    return OrganizationModel.findById(id);
}

export function findOfficeByIdAndDelete(id: string){
    return OrganizationModel.findById(id);
}