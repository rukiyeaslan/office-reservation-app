import { NextFunction, Request, Response } from 'express';
import { findOrganizationById, findOrganizationByIdAndDelete, createNewOrganization, findOrganization, findAndUpdateOrganization} from '../service/Organization';
import {OrganizationModel} from '../models/exportModels';
import { findOfficeById, findOfficeByIdAndDelete,  } from '../service/Office';
import { CreateOrganizationInput, UpdateOrganizationInput } from '../schemas/Organization';

export async function createOrganizationHandler(req: Request<{}, {}, CreateOrganizationInput> , res: Response){
    const body = req.body;
    console.log(body);
    try{
          const newOrganization = createNewOrganization(body);
          return res.status(200).send("organization sucessfully created");
        } catch (e: any) {
          console.error(e);
          return res.status(500).send(e);
}};


export async function readOrganizationHandler (req: Request, res: Response){
    const id = req.params.id;
    return findOrganizationById(id).then((organization: any) => organization ? res.status(200).json({organization}) : res.status(404).json({message: 'not found!'})).catch(error => res.status(404).json({error}));
};


export async function  readAllOrganizationHandler (req: Request, res: Response){

    return findOrganization()
    .then((organizations: any) => res.status(200).json({organizations}) )
    .catch((error: any) => res.status(404).json({error}));
};


export async function  updateOrganizationHandler(req: Request<UpdateOrganizationInput['params'], {}, UpdateOrganizationInput['body']>, res: Response, next: NextFunction){
    const body = req.body;
    const id = req.params.id;
    console.log(id);
    try{
        const filter = {_id: id};
        const update = body;
        const organization = await findAndUpdateOrganization(filter, update, {new: true});
        console.log(organization);
        organization!.save(); //check the !
    
        return res.send('successfully updated organization');

    }catch(e: any){
       return res.status(500).send(e);
    }
};

//TODO: delete desks
export async function deleteOrganizationHandler(req: Request, res: Response){
    
    const id = req.params.id;
    try{
        await findOrganizationByIdAndDelete(id);
        return res.status(200).send("Organization successfully deleted.");
    }catch(err: any){
        return res.status(500).send(err);
    }
};

//export default { createOrganizationHandler, readOrganizationHandler, readAllOrganizationHandler, updateOrganizationHandler, deleteOrganizationHandler};
