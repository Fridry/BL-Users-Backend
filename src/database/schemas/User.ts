import mongoose, { Schema, Document, Model } from 'mongoose'

export type UserAttributes = {
  name: string;
  lastname: string;
  phone: string;
  cpf: string;
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
      type: String,
      trim: true,
      required: true
    },
    cpf: {
      type: String,
      unique: true,
      minLength: 11,
      trim: true,
      required: true
    },
  },
  {
    timestamps: true
  }
)

export default mongoose.model<UserDocument, UserModel>('User', UserSchema)