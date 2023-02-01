import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Organization from '../models/Organization';

const createOrganization = (req: Request, res: Response, next: NextFunction)=>{
    //create a new organization
    const organization = new Organization({
       _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        office: req.body.office
    });
    
    return organization.save().then((organization)=> res.status(201).json({organization})).catch(error => res.status(500).json({error}));
};


const readOrganization = (req: Request, res: Response, next: NextFunction)=>{
    const organizationId = req.params.organizationId;

    return Organization.findById(organizationId).then(organization => organization ? res.status(200).json({organization}) : res.status(404).json({message: 'not found!'})).catch(error => res.status(404).json({error}));
};


const readAllOrganization = (req: Request, res: Response, next: NextFunction)=>{

    return Organization.find()
    .then(organizations => res.status(200).json({organizations}) )
    .catch(error => res.status(404).json({error}));
};


const updateOrganization = (req: Request, res: Response, next: NextFunction)=>{
    const organizationId = req.params.organizationId;

    return Organization.findById(organizationId)
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


const deleteOrganization = (req: Request, res: Response, next: NextFunction)=>{
    const organizationId = req.params.organizationId;

    return Organization.findByIdAndDelete(organizationId)
        .then((organization) => (organization ? res.status(201).json({message: 'deleted'}) : res.status(404).json({message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};

export default { createOrganization, readOrganization, readAllOrganization, updateOrganization, deleteOrganization};
