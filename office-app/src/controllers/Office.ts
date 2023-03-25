import { NextFunction, Request, Response } from 'express';
import { createNewOffice, findOfficeById, findOffice, findOfficeByIdAndDelete } from '../service/Office';
import { findOrganizationById } from '../service/Organization';
import {findDeskByIdAndDelete} from "../service/Desk";
import { OrganizationModel } from '../models/exportModels';

const createOffice = async (req: Request, res: Response, next: NextFunction)=>{
    const body = req.body;
    console.log(body);
    try{
          const office = await createNewOffice(body);
          return res.status(200).send("office sucessfully created");
        } catch (e: any) {
          console.error(e);
          return res.status(500).send(e);
}};


const readOffice = (req: Request, res: Response, next: NextFunction)=>{
    const officeId = req.params.officeId;

    return findOfficeById(officeId).then((office: any) => office ? res.status(200).json({office}) : res.status(404).json({message: 'not found!'})).catch((error: any) => res.status(404).json({error}));
};


const readAllOffice = (req: Request, res: Response, next: NextFunction)=>{

    return findOffice()
    .then((offices: any) => res.status(200).json({offices}) )
    .catch((error: any) => res.status(404).json({error}));
};


const updateOffice= (req: Request, res: Response, next: NextFunction)=>{
    const officeId = req.params.officeId;
    const organizationIdAfter = req.body.organization;  // organization id of the updated desk
    let organizationIdBefore = null;              // organization id of the desk before put request is sent
    
};


//TODO: update organization
const deleteOffice = (req: Request, res: Response, next: NextFunction)=>{
    const officeId = req.params.officeId;
    };


export default { createOffice, readOffice, readAllOffice, updateOffice, deleteOffice};
