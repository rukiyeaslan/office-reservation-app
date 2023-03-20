import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import {OfficeModel, OrganizationModel} from '../models/Models';
import { findOrganizationById, findOrganizationByIdAndDelete, createNewOrganization, findOrganization} from '../service/Organization';
import { findOfficeById, findOfficeByIdAndDelete,  } from '../service/Office';

const createOrganization = (req: Request, res: Response, next: NextFunction)=>{
    //create a new organization
    const organization = await createNewOrganization(req);
    
    return organization.save().then((organization)=> res.status(201).json({organization})).catch(error => res.status(500).json({error}));
};


const readOrganization = (req: Request, res: Response, next: NextFunction)=>{
    const organizationId = req.params.organizationId;

    return findOrganizationById(organizationId).then(organization => organization ? res.status(200).json({organization}) : res.status(404).json({message: 'not found!'})).catch(error => res.status(404).json({error}));
};


const readAllOrganization = (req: Request, res: Response, next: NextFunction)=>{

    return findOrganization()
    .then(organizations => res.status(200).json({organizations}) )
    .catch(error => res.status(404).json({error}));
};


const updateOrganization = (req: Request, res: Response, next: NextFunction)=>{
    const organizationId = req.params.organizationId;

    return findOrganizationById(organizationId)
        .then(organization => {
            if(organization){
                organization.set(req.body);

                return organization
                    .save()
                    .then((organization) => res.status(201).json({organization}))
                    .catch(error => res.status(500).json({error}));
            }
            else{
                res.status(404).json({message: 'not found!'})
            }
        })
        .catch(error => res.status(500).json({error}));
};

//TODO: delete desks
const deleteOrganization = (req: Request, res: Response, next: NextFunction)=>{
    const organizationId = req.params.organizationId;
    findOrganizationById(organizationId)
        .then(organization => {
            if(organization){
                for(let i=0; i< organization?.offices.length; i++){
                    const officeId = organization.offices[i]._id;
                    findOfficeById(officeId);
                }
            }else{
                res.status(404).json({message: 'not found!'});
            }
        })
        .catch(error => res.status(404).json({message: error.message}));
    return findOrganizationByIdAndDelete(organizationId)
        .then((organization) => (organization ? res.status(201).json({message: 'deleted'}) : res.status(404).json({message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));

    };

export default { createOrganization, readOrganization, readAllOrganization, updateOrganization, deleteOrganization};
