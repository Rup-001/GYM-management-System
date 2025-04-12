export const isValidTimeSlot = (startTime: string, endTime: string): boolean => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
  
    const start = new Date();
    const end = new Date();
    start.setHours(startHour, startMin, 0);
    end.setHours(endHour, endMin, 0);
  
    const diffInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return diffInHours === 2;
  };
  