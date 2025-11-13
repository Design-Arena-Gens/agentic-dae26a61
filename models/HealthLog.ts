import mongoose, { Schema, Document } from 'mongoose';

export interface IHealthLog extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  weight: number;
  waterIntake: number;
  calories: number;
  sleep: number;
  createdAt: Date;
}

const HealthLogSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  weight: { type: Number, required: true },
  waterIntake: { type: Number, required: true },
  calories: { type: Number, required: true },
  sleep: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.HealthLog || mongoose.model<IHealthLog>('HealthLog', HealthLogSchema);
