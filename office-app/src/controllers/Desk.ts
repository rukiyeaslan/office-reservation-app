import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Types from 'mongoose';
import {DeskModel, OfficeModel} from "../models/Models";

const createDesk = async (req: Request, res: Response, next: NextFunction)=>{
    console.log(req.body);
    //create a new desk
    
    const desk = new DeskModel({
        name: req.body.name,
        status: req.body.status,
        office: req.body.office
      });

    //add desk to the corresponding office's desks array
    const office = await OfficeModel.findById(req.body.office);
    office?.desks.push(desk);
    await office?.save();

    return await desk.save().then((desk)=> res.status(201).json({desk})).catch(error => res.status(500).json({error}));
};


const readDesk = async (req: Request, res: Response, next: NextFunction)=>{
    const deskId = req.params.deskId;
    console.log(deskId);
    return await DeskModel.findById(deskId)
        .then(desk => desk ? res.status(200).json({desk}) : res.status(404).json({message: 'not found!'}))
        .catch(error => res.status(404).json({error}));
};


const readAllDesk = async (req: Request, res: Response) => {
    return await DeskModel.find()
    .then(desks => res.status(200).json({desks}) )
    .catch(error => res.status(404).json({error}));
};


const updateDesk= async (req: Request, res: Response, next: NextFunction)=>{
    const deskId = req.params.deskId;
    const officeIdAfter = req.body.office;  // office id of the updated desk
    let officeIdBefore = null;              // office id of the desk before put request is sent
    return await DeskModel.findById(deskId)
        .then(async desk => {
            if(desk){
                officeIdBefore = desk.office;
                desk.set(req.body);
                //TODO: handle change in office id
                const office = await OfficeModel.findById(officeIdBefore);
                if(!office){
                    return res.status(404).json({message: "Not found!"});
                }
                const deskIndex = office.desks.findIndex(officeDesk => String(officeDesk._id) === String(desk._id));
                if(String(officeIdBefore) === String(officeIdAfter)){   // Update desk in office's desk array
                    office.desks[deskIndex] = desk;
                    await office.save();
                }
               else{    //change office
                    const newOffice = await OfficeModel.findById(req.body.office);
                    if(!newOffice){
                        return res.status(404).json({message: "Not found!"});
                    }
                    
                    office.desks.splice(deskIndex, 1);  //remove the desk from previous office's desk array   
                    console.log()
                    await office.save();
                    newOffice.desks.push(desk);
                    await newOffice.save();
                }
                
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


const deleteDesk = async (req: Request, res: Response, next: NextFunction)=>{
    const deskId = req.params.deskId;

    return await DeskModel.findByIdAndDelete(deskId)
        .then((desk) => (desk ? res.status(201).json({message: 'deleted'}) : res.status(404).json({message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};

export default { createDesk, readDesk, readAllDesk, updateDesk, deleteDesk};
