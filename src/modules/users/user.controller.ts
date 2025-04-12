import { Request, Response } from 'express';
import { IUser } from '../models/user.model'; 
import { getTraineeProfileService, getTrainerScheduleService } from './user.service';

export const getTraineeProfile = async (req: Request, res: Response) => {
  try {
    const traineeId = (req.user as IUser)._id;
    const { trainee, classes } = await getTraineeProfileService(traineeId);

     res.status(200).json({
      success: true,
      profile: trainee,
      classes,
    });
    return
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    return 
  }
};

export const getTrainerSchedule = async (req: Request, res: Response) => {
    try {
        const trainerId = (req.user as IUser)._id;
  
      const schedules = await getTrainerScheduleService(trainerId);
  
      res.status(200).json({
        success: true,
        classes: schedules,
      });
      return 
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return 
    }
  };