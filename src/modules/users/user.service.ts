import User from '../models/user.model';
import ClassSchedule from '../models/schedule.model';


export const getTraineeProfileService = async (traineeId: string) => {
  const trainee = await User.findById(traineeId).select('-password');
  const classes = await ClassSchedule.find({ trainees: traineeId })
    .populate('trainer', 'name email')
    .sort({ date: 1, startTime: 1 });

  return { trainee, classes };
};

export const getTrainerScheduleService = async (trainerId: string) => {
    const schedules = await ClassSchedule.find({ trainer: trainerId })
      .populate('trainees', 'name email') // show trainee details
      .sort({ date: 1, startTime: 1 });   // sort by date and time
  
    return schedules;
  };
