import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Desk from "../models/Desk";

const createDesk = (req: Request, res: Response, next: NextFunction)=>{
    //create a new desk
    const desk = new Desk({
       _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        office: req.body.office
    });
    
    return desk.save().then((desk)=> res.status(201).json({desk})).catch(error => res.status(500).json({error}));
};


const readDesk = (req: Request, res: Response, next: NextFunction)=>{
    const deskId = req.params.deskId;

    return Desk.findById(deskId)
        .then(desk => desk ? res.status(200).json({desk}) : res.status(404).json({message: 'not found!'}))
        .catch(error => res.status(404).json({error}));
};


const readAllDesk = (req: Request, res: Response, next: NextFunction)=>{

    return Desk.find()
    .then(desks => res.status(200).json({desks}) )
    .catch(error => res.status(404).json({error}));
};


const updateDesk = (req: Request, res: Response, next: NextFunction)=>{
    const deskId = req.params.deskId;

    return Desk.findById(deskId)
        .then(desk => {
            if(desk){
                desk.set(req.body);

                return desk
                    .save()
                    .then((desk) => res.status(201).json({desk}))
                    .catch(error => res.status(500).json({error}));
            }
            else{
                res.status(404).json({message: 'not found!'})
            }
        })
        .catch(error => res.status(500).json({error}));
};


const deleteDesk = (req: Request, res: Response, next: NextFunction)=>{
    const deskId = req.params.deskId;

    return Desk.findByIdAndDelete(deskId)
        .then((desk) => (desk ? res.status(201).json({message: 'deleted'}) : res.status(404).json({message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};

export default { createDesk, readDesk, readAllDesk, updateDesk, deleteDesk};
