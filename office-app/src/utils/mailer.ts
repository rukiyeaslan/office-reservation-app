import nodemailer, {SendMailOptions} from "nodemailer";
import {config} from "../config/config";


// async function createTestCreds(){
//     const creds= await nodemailer.createTestAccount();
//     console.log({creds});
// }

// createTestCreds();

const smtp = config.smtp
console.log(smtp);
const transporter = nodemailer.createTransport({
    ...smtp,
    auth: {user: smtp.user, pass: smtp.pass}
})
async function sendEmail(payload: SendMailOptions){
    transporter.sendMail(payload, (err, info) => {

        if(err){
            console.log(err);
            return;
        }
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);

    })
}

export default sendEmail;