import { NextFunction, Request, Response } from 'express';
import { createNewOffice, findOfficeById, findOffice, findOfficeByIdAndDelete } from '../service/Office';
import { findOrganizationById } from '../service/Organization';
import {findDeskByIdAndDelete} from "../service/Desk";


const createOffice = async (req: Request, res: Response, next: NextFunction)=>{
    //create a new office
    const office = createNewOffice(req);
    const organization = await findOrganizationById(req.body.organization);
    organization?.offices.push(office);
    await organization?.save();
    return office.save().then((office)=> res.status(201).json({office})).catch(error => res.status(500).json({error}));
};


const readOffice = (req: Request, res: Response, next: NextFunction)=>{
    const officeId = req.params.officeId;

    return findOfficeById(officeId).then(office => office ? res.status(200).json({office}) : res.status(404).json({message: 'not found!'})).catch(error => res.status(404).json({error}));
};


const readAllOffice = (req: Request, res: Response, next: NextFunction)=>{

    return findOffice()
    .then(offices => res.status(200).json({offices}) )
    .catch(error => res.status(404).json({error}));
};


const updateOffice= (req: Request, res: Response, next: NextFunction)=>{
    const officeId = req.params.officeId;
    const organizationIdAfter = req.body.organization;  // organization id of the updated desk
    let organizationIdBefore = null;              // organization id of the desk before put request is sent
    
    return findOfficeById(officeId)
        .then(async office => {
            if(office){
                organizationIdBefore = office.organization;
                office.set(req.body);
                const organization = await findOrganizationById(String(organizationIdBefore));
                
                if(!organization){
                    return res.status(404).json({message: "Not found!"});
                }

                const officeIndex = organization.offices.findIndex(organizationOffice => String(organizationOffice._id) === String(office._id));
                if(String(organizationIdBefore) === String(organizationIdAfter)){    // Update office in organization's offices array
                    organization.offices[officeIndex] = office;
                    await organization.save();
                }
                else{    //change office
                    const newOrganization = await findOrganizationById(req.body.organization);
                    if(!newOrganization){
                        return res.status(404).json({message: "Not found!"});
                    }
                    
                    organization.offices.splice(officeIndex, 1);    //remove the office from previous organization's offices array   
                    console.log()
                    await organization.save();
                    newOrganization.offices.push(office);
                    await newOrganization.save();
                }
                
                return office
                    .save()
                    .then((office) => res.status(201).json({office}))
                    .catch(error => res.status(500).json({error}));
            }
            else{
                res.status(404).json({message: 'not found!'});
            }
        })
        .catch(error => res.status(500).json({error}));
};


//TODO: update organization
const deleteOffice = (req: Request, res: Response, next: NextFunction)=>{
    const officeId = req.params.officeId;
    findOfficeById(officeId)
        .then(office => {
            if(office){
                for(let i=0; i< office?.desks.length; i++){
                    const deskId = office.desks[i]._id;
                    findDeskByIdAndDelete(deskId);
                }
            }else{
                res.status(404).json({message: 'not found!'});
            }
            
        })
        .catch(error => res.status(404).json({message: error.message}));
    return findOfficeByIdAndDelete(officeId)
        .then((office) => (office ? res.status(201).json({message: 'office deleted'}) : res.status(404).json({message: 'Not found'})))
        .catch((error) => res.status(500).json({error}));
};


export default { createOffice, readOffice, readAllOffice, updateOffice, deleteOffice};
