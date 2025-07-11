import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ],
    jobPosted: {
        type: Boolean,
        default: false, // Will track if the job has been posted in the last 30 days
    },
    // Store the timestamp of the last post
    lastPost: {
        type: Date,
        default: null
    }
}, { timestamps: true });

// Pre-save hook to handle updating the jobPosted flag
jobSchema.pre('save', function (next) {
    const now = new Date();
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000); // 30 days ago

    // If lastPost is within the last 30 days, set jobPosted flag to true
    if (this.lastPost && this.lastPost >= thirtyDaysAgo) {
        this.jobPosted = true;
    } else {
        this.jobPosted = false;
    }

    // Ensure that lastPost is updated with the current date
    this.lastPost = now;

    next();
});

export const Job = mongoose.model("Job", jobSchema);
