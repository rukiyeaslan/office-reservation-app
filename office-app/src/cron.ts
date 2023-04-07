import { CronJob } from 'cron';
import  DeskModel, { Desk } from './models/Desk';

export const deleteExpiredReservations = async () => {
  const expiredDesks = await DeskModel.find({
    reserved: true,
    reservationEndTime: { $lte: new Date() }
  });

  for (const desk of expiredDesks) {
    desk.reserved = false;
    desk.reservationStartTime = null;
    desk.reservationEndTime = null;
    await desk.save();
  }

  console.log(`Deleted ${expiredDesks.length} expired reservations.`);
};

const job = new CronJob('0 0 1 * *', deleteExpiredReservations);
job.start();