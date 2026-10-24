import mongoose from 'mongoose';

// Delete cached model if it exists so Next.js reloads the schema immediately
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
      default: 'Citizen Applicant',
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: false, // Made completely optional
      default: '',
    },
    password: {
      type: String,
      required: false, // Holds active OTP or password
    },
    aadhaar: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      default: 'Delhi',
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);