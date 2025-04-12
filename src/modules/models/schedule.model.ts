// models/ClassSchedule.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IClassSchedule extends Document {
  date: string; // 'YYYY-MM-DD'
  startTime: string; // 'HH:mm'
  endTime: string;   // 'HH:mm'
  trainer: Types.ObjectId;
  trainees: Types.ObjectId[];
}

const ClassScheduleSchema = new Schema<IClassSchedule>({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  trainer: { type: Schema.Types.ObjectId, ref: 'User'},
  trainees: [{ type: Schema.Types.ObjectId, ref: 'User'}],
}, { timestamps: true });

ClassScheduleSchema.index({ date: 1, startTime: 1 }, { unique: true }); // prevent duplicate slots

export default model<IClassSchedule>('ClassSchedule', ClassScheduleSchema);
