import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    salaryFromRange: {
      type: Number,
      required: true,
    },
    salaryToRange: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    workMode: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Delete old model
if (mongoose.models.Job) {
    const jobModel = mongoose.model('jobs');
    mongoose.deleteModel(jobModel.modelName);
}

// Create model
const Job = mongoose.model('jobs', jobSchema);
export default Job;