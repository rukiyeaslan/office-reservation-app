import { NextFunction, Request, Response } from "express";
import DeskModel from "../models/Desk";
import OfficeModel from "../models/Office";
import { CreateDeskInput, UpdateDeskInput, updateDeskSchema } from "../schemas/Desk";
import { createDesk, findDesk, findDeskById, findDeskByIdAndDelete } from "../service/Desk";
import { findOfficeById } from "../service/Office";

const createDeskHandler = async (req: Request<{}, {}, CreateDeskInput>, res: Response)=>{
    const body = req.body;
    console.log(req.body);
    try {
        const { name, organization, office, reserved, reservationStartTime, reservationEndTime } = body;
        console.log(office);
        // Find the office in the database
        const foundOffice = findOfficeById(office);
        if (!foundOffice) {
          throw new Error('Office not found');
        }
    
        // Set the office field to the found office's id
        const deskInput = {
          name,
          reserved,
          reservationStartTime,
          reservationEndTime,
          office: foundOffice._id,
          organization
        };
    
        // Create a new desk object and save it to the database
        const newDesk = await DeskModel.create(deskInput);
    
        return newDesk;
      } catch (err) {
        console.error(err);
        throw new Error('Error creating desk');
      }};


const readDeskHandler = async (req: Request, res: Response, next: NextFunction)=>{
    const deskId = req.params.id;
    return await findDeskById(deskId)
        .then((desk: any) => desk ? res.status(200).json({desk}) : res.status(404).json({message: 'not found!'}))
        .catch((error: any) => res.status(404).json({error}));
};


const readAllDeskHandler = async (req: Request, res: Response) => {
    return await findDesk()
    .then((desks: any) => res.status(200).json({desks}) )
    .catch((error: any) => res.status(404).json({error}));
};

//TODO: update organization
const updateDeskHandler = async (req: Request, res: Response, next: NextFunction)=>{

    try{
        const deskId = req.params.id;
        const updatedDesk = updateDeskSchema.parse(req.body);

        const desk = await DeskModel.findByIdAndUpdate(deskId, updatedDesk, { new: true });
        res.status(200).json(desk);

    }catch(error: any){

        console.error(error);
        res.status(500).json({ message: 'Error updating desk' });
    }
}


//TODO: delete by chaining
const deleteDeskHandler = async (req: Request, res: Response, next: NextFunction)=>{
    const deskId = req.params.id;

    return await findDeskByIdAndDelete(deskId)
        .then((desk: any) => (desk ? res.status(201).json({message: 'deleted'}) : res.status(404).json({message: 'Not found'})))
        .catch((error: any) => res.status(500).json({ error }));
};

export default { createDeskHandler, readDeskHandler, readAllDeskHandler, updateDeskHandler, deleteDeskHandler }; 
