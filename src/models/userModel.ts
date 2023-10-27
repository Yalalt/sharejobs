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
      required: [true, 'Please enter your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
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
