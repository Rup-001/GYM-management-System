import ClassSchedule from '../models/schedule.model';
import { isValidTimeSlot } from './schedule.timeUtils'; 
import { Types } from 'mongoose';

export const createScheduleService = async (
  date: string,
  startTime: string,
  endTime: string
) => {
  // 1. Limit: Max 5 schedules per day
  const existingSchedulesCount = await ClassSchedule.countDocuments({ date });
  if (existingSchedulesCount >= 5) {
    return {
      error: {
        message: 'Maximum 5 classes allowed per day',
        status: 400
      }
    };
  }

  // 2. Validation: Exactly 2 hours
  if (!isValidTimeSlot(startTime, endTime)) {
    return {
      error: {
        message: 'Each class must be exactly 2 hours long',
        status: 400
      }
    };
  }

  // 3. Create the schedule (no trainer/trainees yet)
  const schedule = await ClassSchedule.create({
    date,
    startTime,
    endTime,
    trainer: null,
    trainees: []
  });

  return { schedule };
};


export const assignTrainerToSchedule = async (scheduleId: string, trainerId: string) => {
  const schedule = await ClassSchedule.findById(scheduleId);

  if (!schedule) {
    throw new Error('Schedule not found');
  }

  if (schedule.trainer) {
    throw new Error('Trainer already assigned to this schedule');
  }

  schedule.trainer = new Types.ObjectId(trainerId);
  const updatedSchedule = await schedule.save();

  return updatedSchedule;
  };