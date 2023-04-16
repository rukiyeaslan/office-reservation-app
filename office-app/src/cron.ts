import { CronJob } from 'cron';
import  DeskModel, { Desk } from './models/Desk';

export const deleteExpiredReservations = async () => {
  const expiredDesks = await DeskModel.find({
    reservationEndTime: { $lte: new Date() }
  });



  console.log(`Deleted ${expiredDesks.length} expired reservations.`);
};

const job = new CronJob('0 0 1 * *', deleteExpiredReservations);
job.start();