import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Office from '../models/Office';

const createOffice = (req: Request, res: Response, next: NextFunction)=>{
    //create a new office
    const office = new Office({
       _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        organization: req.body.organization
    });
    
    return office.save().then((office)=> res.status(201).json({office})).catch(error => res.status(500).json({error}));
};


const readOffice = (req: Request, res: Response, next: NextFunction)=>{
    const officeId = req.params.officeId;

    return Office.findById(officeId).then(office => office ? res.status(200).json({office}) : res.status(404).json({message: 'not found!'})).catch(error => res.status(404).json({error}));
};


const readAllOffice = (req: Request, res: Response, next: NextFunction)=>{

    return Office.find()
    .then(offices => res.status(200).json({offices}) )
    .catch(error => res.status(404).json({error}));
};


const updateOffice = (req: Request, res: Response, next: NextFunction)=>{
    const officeId = req.params.officeId;

    return Office.findById(officeId)
        .then(office => {
            if(office){
                office.set(req.body);

                return office
                    .save()
                    .then((office) => res.status(201).json({office}))
                    .catch(error => res.status(500).json({error}));
            }
            else{
                res.status(404).json({message: 'not found!'})
            }
        })
        .catch(error => res.status(500).json({error}));
};


const deleteOffice = (req: Request, res: Response, next: NextFunction)=>{
    const officeId = req.params.officeId;

    return Office.findByIdAndDelete(officeId)
        .then((office) => (office ? res.status(201).json({message: 'deleted'}) : res.status(404).json({message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};

export default { createOffice, readOffice, readAllOffice, updateOffice, deleteOffice};
