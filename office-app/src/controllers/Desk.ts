import { NextFunction, Request, Response } from "express";
import DeskModel from "../models/Desk";
import { CreateDeskInput, ReadDeskInput, UpdateDeskInput, updateDeskSchema } from "../schemas/Desk";
import { createDesk, findAndUpdateDesk, findDesk, findDeskById, findDeskByIdAndDelete } from "../service/Desk";

//Request<{}, {}, CreateDeskInput> f'ves types of "office" are not compatible
const createDeskHandler = async (req: Request, res: Response, next: NextFunction)=>{
  const body = req.body;
  console.log(body);
  try{
        //add newly created desk to its offices's desks array
        const desk = await createDesk(body);
        return res.status(200).send("desk sucessfully created");
      } catch (err: any) {
        return res.status(500).send(err);
}};


const readDeskHandler = async (req: Request<ReadDeskInput, {}, {}>, res: Response, next: NextFunction)=>{
    const id = req.params.id;
    return await findDeskById(id)
        .then((desk: any) => desk ? res.status(200).json({desk}) : res.status(404).json({message: 'not found!'}))
        .catch((error: any) => res.status(404).json({error}));
};


const readAllDeskHandler = async (req: Request, res: Response) => {
    return await findDesk()
    .then((desks: any) => res.status(200).json({desks}) )
    .catch((error: any) => res.status(404).json({error}));
};


//TODO: update organization
export async function  updateDeskHandler(req: Request<UpdateDeskInput['params'], {}, UpdateDeskInput['body']>, res: Response, next: NextFunction){
  const body = req.body;
  const id = req.params.id;
  try{
      const filter = {id};
      const update = body;
      const desk =  await findAndUpdateDesk(filter, update, {});
      desk!.save(); //check the !
  
      return res.send('successfully updated desk');

  }catch(e: any){
    if (e.code === '11000') {
      console.log("here error");
    }
    return res.status(500).send(e);
  }
};


//TODO: delete by chaining
const deleteDeskHandler = async (req: Request, res: Response, next: NextFunction)=>{
    const deskId = req.params.id;

    return await findDeskByIdAndDelete(deskId)
        .then((desk: any) => (desk ? res.status(201).json({message: 'deleted'}) : res.status(404).json({message: 'Not found'})))
        .catch((error: any) => res.status(500).json({ error }));
};


export default { createDeskHandler, readDeskHandler, readAllDeskHandler, updateDeskHandler, deleteDeskHandler }; 
