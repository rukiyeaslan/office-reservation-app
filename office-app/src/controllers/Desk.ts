import { NextFunction, Request, Response } from "express";
import { ReadDeskInput, UpdateDeskInput } from "../schemas/Desk";
import { createDesk, findAndUpdateDesk, findDesk, findDeskById, findDeskByIdAndDelete } from "../service/Desk";
import { findOfficeById } from "../service/Office";


const createDeskHandler = async (req: Request, res: Response, next: NextFunction)=>{
  const body = req.body;
  console.log(body);
  try{
      
        const office = findOfficeById(body.office);
        if(!office){
          return res.status(404).send("office not found");
        }
        
        const desk = await createDesk(body);
        office.desks.push(desk);
        office.save();

        return res.status(200).send("desk");
      } catch (err: any) {
        return res.status(500).send(err);
}};


const readDeskHandler = async (req: Request<ReadDeskInput, {}, {}>, res: Response, next: NextFunction)=>{
    const id = req.params.id;
    return await findDeskById(id)
        .then((desk: any) => desk ? res.status(200).json({desk}) : res.status(404).json({message: 'desk not found!'}))
        .catch((error: any) => res.status(404).json({error}));
};


const readAllDeskHandler = async (req: Request, res: Response) => {
    return await findDesk()
    .then((desks: any) => res.status(200).json({desks}) )
    .catch((error: any) => res.status(404).json({error}));
};


export async function  updateDeskHandler(req: Request<UpdateDeskInput['params'], {}, UpdateDeskInput['body']>, res: Response, next: NextFunction){
  const body = req.body;
  const id = req.params.id;
  try{
      const filter = {id};
      const update = body;
      const desk =  await findAndUpdateDesk(filter, update, {});
      desk!.save();    
  
      return res.send('successfully updated desk');

  }catch(e: any){
    if (e.code === '11000') {
      console.log("unique name error");  //TODO: check this error again
    }
    return res.status(500).send(e);
  }
};


const deleteDeskHandler = async (req: Request, res: Response, next: NextFunction)=>{
    const deskId = req.params.id;

    return await findDeskByIdAndDelete(deskId)
        .then((desk: any) => (desk ? res.status(201).json({message: 'desk is deleted'}) : res.status(404).json({message: 'desk not found'})))
        .catch((error: any) => res.status(500).json({ error }));
};


export default { createDeskHandler, readDeskHandler, readAllDeskHandler, updateDeskHandler, deleteDeskHandler }; 
