import { NextFunction, Request, Response } from "express";
import { GetAvailableSlotsInput, UpdateReservationInput } from "../schemas/Reservation";
import { findAndUpdateDesk, findDesk, findDeskById } from "../service/Desk";
import { createReservation, findAndUpdateReservation } from "../service/Reservation";


const createReservationHandler = async (req: Request, res: Response, next: NextFunction)=>{
    const body = req.body;
    const deskId = req.body.deskId;
    console.log(body);
    try{
          //add newly created desk to its offices's desks array
          const reservation = await createReservation(body, body);

          return res.status(200).send("Reservation sucessfully created");
        } catch (e: any) {
          return res.status(500).send(e);
  }};

//TODO: check the file, should this function be in desk.ts or reservation.ts
export async function getAvailableSlotsHandler(req: Request<GetAvailableSlotsInput, {}, {}>, res: Response, next: NextFunction){
    const id = req.params.id;
    try{
      const desk = await findDeskById(id);
      
      if(desk){
        const availableSlots = desk?.availableSlots;
        return res.status(200).json(availableSlots);
      }
      return res.status(404).send("Couldn't find the desk"!);
    }
    catch(e: any){
      return res.status(404).send(e);
    }
};

export async function  updateReservationHandler(req: Request<UpdateReservationInput['params'], {}, UpdateReservationInput['body']>, res: Response, next: NextFunction){
    const body = req.body;
    const id = req.params.id;
    try{
        const filter = {id};
        const update = body;
        const reservation =  await findAndUpdateReservation(filter, update, {});
        reservation!.save();         //TODO: check the !
    
        return res.send('Successfully updated desk');
  
    }catch(e: any){
      if (e.code === '11000') {
        console.log("unique name error");  //TODO: check this error again
      }
      return res.status(500).send(e);
    }
  };

export default { createReservationHandler, getAvailableSlotsHandler}; 

  