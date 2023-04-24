import { NextFunction, Request, Response } from 'express';
import { createNewOffice, findOfficeById, findOffice, findOfficeByIdAndDelete, findAndUpdateOffice } from '../service/Office';
import { DeleteOfficeInput, UpdateOfficeInput } from '../schemas/Office';

const createOfficeHandler = async (req: Request, res: Response, next: NextFunction)=>{
    const body = req.body;
    console.log(body);
    try{
          
        const organization = findOfficeById(body.office);
        if(!organization){
        return res.status(404).send("could not find the organization");
        }
    
        const office = await createNewOffice(body);
        organization.offices.push(office);
        return res.status(200).send(office);
    } catch (err: any) {
        return res.status(500).send(err);
}};


const readOfficeHandler = (req: Request, res: Response)=>{
    const id = req.params.id;
    return findOfficeById(id).then((office: any) => office ? res.status(200).json({office}) : res.status(404).json({message: 'not found!'})).catch(error => res.status(404).json({error}));

};


const readAllOfficeHandler = (req: Request, res: Response, next: NextFunction)=>{

    return findOffice()
    .then((offices: any) => res.status(200).json({offices}) )
    .catch((error: any) => res.status(404).json({error}));
};



export async function  updateOfficeHandler(req: Request<UpdateOfficeInput['params'], {}, UpdateOfficeInput['body']>, res: Response, next: NextFunction){
    const body = req.body;
    const id = req.params.id;
    try{
        const filter = {id};
        const update = body;
        const office = await findAndUpdateOffice(filter, update, {new: true});
        office!.save(); //check the !
    
        return res.send('successfully updated office');

    }catch(e: any){
       return res.status(500).send(e);
    }
};


export async function deleteOfficeHandler(req: Request<DeleteOfficeInput, {}, {}>, res: Response){
    const id = req.params.id;
    try{
        await findOfficeByIdAndDelete(id);
        return res.status(200).send("Office successfully deleted.");
    }catch(err: any){
        return res.status(500).send(err);
    }
};


export default { createOfficeHandler, readOfficeHandler, readAllOfficeHandler, updateOfficeHandler, deleteOfficeHandler};
