// controllers/schedule/bookClass.controller.ts
import { Request, Response } from 'express';
import { bookClass, cancelBooking } from './booking.service';
import { IUser } from '../models/user.model'; 


export const bookClassController = async (req: Request, res: Response) => {
  try {
   
      const traineeId = (req.user as IUser)._id;
    const { scheduleId } = req.body;

    const updatedSchedule = await bookClass(scheduleId, traineeId);
    res.status(200).json({
      success: true,
      message: 'Class booked successfully',
      data: updatedSchedule,
    });
    return 
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to book class',
    });
    return 
  }
};

export const cancelBookingController = async (req: Request, res: Response) => {
  try {
    const traineeId = (req.user as IUser)._id;
    const { scheduleId } = req.body;

    const updatedSchedule = await cancelBooking(scheduleId, traineeId);
    res.status(200).json({
      success: true,
      message: 'Booking canceled successfully',
      data: updatedSchedule,
    });
    return 
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to cancel booking',
    });
    return 
  }
};
