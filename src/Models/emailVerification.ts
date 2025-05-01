// models/EmailVerification.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEmailVerification extends Document {
  email: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
}

const EmailVerificationSchema = new Schema<IEmailVerification>({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

EmailVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


export const EmailVerification= mongoose.models.emailverifications ||
  mongoose.model<IEmailVerification>('emailverifications', EmailVerificationSchema);
