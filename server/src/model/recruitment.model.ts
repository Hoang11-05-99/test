import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import {
  Address,
  Rank,
  Salary,
  Status,
  Type,
  WorkExperience,
  WorkingForm,
} from 'src/constant/enum';

export type RecruitmentDocument = Recruitment & Document;

@Schema()
export class Recruitment {
  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ required: true, default: null })
  salary: Salary;

  @Prop({
    required: true,
    default: null,
  })
  address: Address;

  @Prop({
    required: true,
    default: null,
  })
  type: Type;

  @Prop({ required: true, default: null })
  workingForm: WorkingForm;

  @Prop({ required: true, default: null })
  rank: Rank;

  @Prop({ required: true, default: null })
  workExperience: WorkExperience;

  @Prop({ type: String, required: true })
  quantity: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  imgUrl: string;

  @Prop({ type: String, required: true })
  contact: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ required: true, default: null })
  status: Status;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account' })
  writer: Types.ObjectId;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'CV' }])
  cv: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updateAt: Date;
}

export const RecruitmentSchema = SchemaFactory.createForClass(Recruitment);
