import { NextFunction, Request, Response } from 'express';
import { findOrganizationById, findOrganizationByIdAndDelete, createNewOrganization, findOrganization} from '../service/Organization';
import OrganizationModel from '../models/Organization';
import { findOfficeById, findOfficeByIdAndDelete,  } from '../service/Office';
import { CreateOrganizationInput } from '../schemas/Organization';

export async function createOrganizationHandler(req: Request<{}, {}, {}> , res: Response){
    const body = req.body;
    console.log(body);
    try{
          // Create a new desk object and save it to the database
          //const newOrganization = await OrganizationModel.create(organizationInput);
          
          const newOrganization = createNewOrganization(body);
          return res.status(200).send("organization sucessfully created");
        } catch (e: any) {
          console.error(e);
          return res.status(500).send(e);
}};


export async function readOrganizationHandler (req: Request, res: Response, next: NextFunction){
    const organizationId = req.params.organizationId;

    return findOrganizationById(organizationId).then((organization: any) => organization ? res.status(200).json({organization}) : res.status(404).json({message: 'not found!'})).catch(error => res.status(404).json({error}));
};


export async function  readAllOrganizationHandler (req: Request, res: Response, next: NextFunction){

    return findOrganization()
    .then((organizations: any) => res.status(200).json({organizations}) )
    .catch((error: any) => res.status(404).json({error}));
};


export async function  updateOrganizationHandler(req: Request, res: Response, next: NextFunction){
    const organizationId = req.params.organizationId;

    return findOrganizationById(organizationId)
        .then((organization) => {
            if(organization){
                organization.set(req.body);

                return organization
                    .save()
                    .then((organization: any) => res.status(201).json({organization}))
                    .catch(error => res.status(500).json({error}));
            }
            else{
                res.status(404).json({message: 'not found!'})
            }
        })
        .catch((error: any) => res.status(500).json({error}));
};

//TODO: delete desks
export async function deleteOrganizationHandler(req: Request, res: Response, next: NextFunction){
    
    const organizationId = req.params.organizationId;
    
    };

//export default { createOrganizationHandler, readOrganizationHandler, readAllOrganizationHandler, updateOrganizationHandler, deleteOrganizationHandler};
