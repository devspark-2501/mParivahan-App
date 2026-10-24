import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  parentName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  aadhaar: { type: String, required: true },
  dob: { type: String, required: true },
  age: { type: Number, required: true },
  licenseCategory: { type: String, required: true }, // 'Junior (16-18)' or 'Standard (18+)'
  birthCertFileName: { type: String, default: '' },
  aadhaarCopyFileName: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);