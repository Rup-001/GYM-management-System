import { Request, Response, NextFunction  } from "express";
import { createScheduleService, assignTrainerToSchedule  } from './schedule.service';


export const createClassSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, startTime, endTime } = req.body;

    const result = await createScheduleService(date, startTime, endTime);

    if (result.error) {
     res.status(result.error.status || 400).json({ message: result.error.message });
     return 
    }

    res.status(201).json({
      message: 'Class schedule created successfully',
      schedule: result.schedule
    });

  } catch (error:any) {
    if (error.code === 11000) {
         res.status(400).json({ message: 'Schedule already exists for this date and time.' });
         return
      }
    console.error('Error creating class schedule:', error);
    res.status(500).json({ message: 'Server error' });
    return 
  }
};

export const assignTrainer = async (req: Request, res: Response) => {
  try {
    const { scheduleId, trainerId } = req.body;

    const updatedSchedule = await assignTrainerToSchedule(scheduleId, trainerId);

    res.status(200).json({
      message: 'Trainer assigned successfully',
      data: updatedSchedule,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error assigning trainer' });
  }
};
