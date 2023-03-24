import { NextFunction, Request, Response } from 'express';
import { createNewOffice, findOfficeById, findOffice, findOfficeByIdAndDelete } from '../service/Office';
import { findOrganizationById } from '../service/Organization';
import {findDeskByIdAndDelete} from "../service/Desk";

const createOffice = async (req: Request, res: Response, next: NextFunction)=>{
    //create a new office
    const office = createNewOffice(req);
    const organization = await findOrganizationById(req.body.organization);
    // organization?.offices.push(office);
    // await organization?.save();
    return office.save().then((office: any)=> res.status(201).json({office})).catch((error: any) => res.status(500).json({error}));
};


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
