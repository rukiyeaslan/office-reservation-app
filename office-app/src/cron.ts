import { CronJob } from 'cron';

import  ReservationModel from './models/Reservation';

export const deleteExpiredReservations = async () => {
  const reservations =  await ReservationModel.deleteMany();

  console.log(`Deleted the expired reservations.`);
};

const job = new CronJob('0 0 1 * *', deleteExpiredReservations);
job.start();