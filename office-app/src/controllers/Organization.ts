import { NextFunction, Request, Response } from 'express';
import { findOrganizationById, findOrganizationByIdAndDelete, createNewOrganization, findOrganization} from '../service/Organization';
import OrganizationModel from '../models/Organization';
import { findOfficeById, findOfficeByIdAndDelete,  } from '../service/Office';
import { CreateOrganizationInput } from '../schemas/Organization';

const createOrganizationHandler = (req: Request<{}, {}, CreateOrganizationInput> , res: Response, next: NextFunction)=>{
    const body = req.body;
    console.log(body);
    try{
  
          // Create a new desk object and save it to the database
          //const newOrganization = await OrganizationModel.create(organizationInput);
          
          const newOrganization = OrganizationModel.create(body);
          return newOrganization;
        } catch (err: any) {
          console.error(err);
          throw new Error('Error creating organization');
}};


const readOrganizationHandler = (req: Request, res: Response, next: NextFunction)=>{
    const organizationId = req.params.organizationId;

    return findOrganizationById(organizationId).then((organization: any) => organization ? res.status(200).json({organization}) : res.status(404).json({message: 'not found!'})).catch(error => res.status(404).json({error}));
};


const readAllOrganizationHandler = (req: Request, res: Response, next: NextFunction)=>{

    return findOrganization()
    .then((organizations: any) => res.status(200).json({organizations}) )
    .catch((error: any) => res.status(404).json({error}));
};


const updateOrganizationHandler = (req: Request, res: Response, next: NextFunction)=>{
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
const deleteOrganizationHandler = (req: Request, res: Response, next: NextFunction)=>{
    
    const organizationId = req.params.organizationId;
    
    };

export default { createOrganizationHandler, readOrganizationHandler, readAllOrganizationHandler, updateOrganizationHandler, deleteOrganizationHandler};
