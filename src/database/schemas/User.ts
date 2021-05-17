import mongoose, { Schema, Document, Model } from 'mongoose'

export type UserAttributes = {
  name: string;
  lastname: string;
  phone: number;
  cpf: number;
}

export type UserDocument = Document & UserAttributes

type UserModel = Model<UserDocument>

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    lastname: {
      type: String,
      trim: true,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    cpf: {
      type: Number,
      unique: true,
      min: 11,
      max: 11,
      required: true
    },
  },
  {
    timestamps: true
  }
)

export default mongoose.model<UserDocument, UserModel>('User', UserSchema)