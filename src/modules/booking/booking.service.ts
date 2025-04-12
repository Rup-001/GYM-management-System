// services/schedule.service.ts
import ClassSchedule from '../models/schedule.model';
import { Types } from 'mongoose';

export const bookClass = async (scheduleId: string, traineeId: string) => {
  const schedule = await ClassSchedule.findById(scheduleId);
  if (!schedule) throw new Error('Schedule not found');

  // Check if trainee already booked this class
  if (schedule.trainees.includes(new Types.ObjectId(traineeId))) {
    throw new Error('You have already booked this class');
  }

  // Check for max 10 trainees
  if (schedule.trainees.length >= 10) {
    throw new Error('Class is full. No more trainees can be added.');
  }

  // Check if trainee has another class in the same time slot
  const hasConflict = await ClassSchedule.findOne({
    date: schedule.date,
    startTime: schedule.startTime,
    trainees: traineeId,
  });
  if (hasConflict) {
    throw new Error('You already have a booking at this time slot');
  }

  // Book the class
  schedule.trainees.push(new Types.ObjectId(traineeId));
  return await schedule.save();
};

export const cancelBooking = async (scheduleId: string, traineeId: string) => {
  const schedule = await ClassSchedule.findById(scheduleId);
  if (!schedule) throw new Error('Schedule not found');

  const index = schedule.trainees.findIndex(
    (id) => id.toString() === traineeId.toString()
  );

  if (index === -1) {
    throw new Error('You are not enrolled in this class');
  }

  schedule.trainees.splice(index, 1);
  return await schedule.save();
};
