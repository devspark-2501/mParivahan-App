import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide full name as per Aadhaar'],
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, 'Please provide a 10-digit mobile number'],
    unique: true,
    trim: true,
  },
  aadhaar: {
    type: String,
    default: '',
    trim: true,
  },
  state: {
    type: String,
    default: 'Delhi',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);