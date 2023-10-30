import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      default: 'employee',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    // Add fields for employee
    skills: {
      type: [],
      required: false,
    },
    experience: {
      type: [],
      required: false,
    },
    educations: {
      type: [],
      required: false,
    },
    carrierObjective: {
      type: String,
      required: false,
    },

    // Employer fields
    establishmentYear: {
      type: String,
      required: false,
    },
    companySize: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Delete old model
if (mongoose.models.users) {
  const userModel = mongoose.model('users');
  mongoose.deleteModel(userModel.modelName);
}

// Create new model
const User = mongoose.model('users', userSchema);
export default User;
