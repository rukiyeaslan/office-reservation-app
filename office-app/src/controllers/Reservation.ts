import { NextFunction, Request, Response } from "express";
import { GetReservationsInput } from "../schemas/Reservation";
import { findDeskById } from "../service/Desk";
import { findOfficeById } from "../service/Office";
import { createReservation, findReservationByIdAndDelete, getReservations } from "../service/Reservation";


const createReservationHandler = async (req: Request, res: Response, next: NextFunction)=>{
    const body = req.body;
    const { day, officeId, deskId} = body
    try{
          const office = findOfficeById(officeId);
          if(!office){
            return res.status(404).send('could not find the office');
          }
          const desk = findDeskById(deskId);
          if(!desk){
            return res.status(404).send('could not find the desk');
          }
          
          const reservationsOnThatDay = await getReservations(day, officeId);
          if(reservationsOnThatDay.includes(deskId)){
            return res.status(404).send("Desk is already reserved");
          }
          const reservation = await createReservation(body);
          return res.status(200).send("Reservation sucessfully created");
        } catch (e: any) {
          return res.status(500).send(e);
  }};


async function getReservationsHandler(req: Request<GetReservationsInput, {}, {}>, res: Response, next: NextFunction){

    const day = req.params.day;
    const office = req.params.office;
    try{
      const reservations = await getReservations(day, office);
      return res.status(200).json(reservations);
    }
    catch(e: any){
      return res.status(404).send(e);
    }
};


const deleteReservationHandler = async (req: Request, res: Response, next: NextFunction)=>{
  const deskId = req.params.id;

  return await findReservationByIdAndDelete(deskId)
      .then((desk: any) => (desk ? res.status(201).json({message: 'deleted'}) : res.status(404).json({message: 'Not found'})))
      .catch((error: any) => res.status(500).json({ error }));
};


export default { createReservationHandler, getReservationsHandler, deleteReservationHandler}; 

  