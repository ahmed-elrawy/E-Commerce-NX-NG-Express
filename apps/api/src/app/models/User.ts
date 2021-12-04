import { Schema, model, Document } from 'mongoose';
import { Profile} from '../../../../../libs/models/profile'
const UserSchema = new Schema(
  {
  username: { type: String,  required: true, unique: true},
  firstname: { type: String,  required: true, unique: true},
  lastname: { type: String,  required: true, unique: true},
  password: { type: String,  required: true, unique: true},
  email: { type: String, required: true, unique: true},
  gender: { type: String,  required: true, unique: true},
  age: { type: String,  required: true, unique: true},
  phone: { type: String,  required: true, unique: true},
  country: { type: String,  required: true, unique: true},
  city: { type: String,  required: true, unique: true},
  address: { type: String, required: true},
  isAdmin: {
    type : Boolean,
    default: false
  },
 
},
{timestamps:  true}
);






const UserModel = model<Profile>('User', UserSchema);
export default  UserModel;