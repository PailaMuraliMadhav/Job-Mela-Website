import mongoose from "mongoose";

const uniSchema = new mongoose.Schema({
    loginHistory: [{
        type: Date,
        default: []
    }],
    studentLogin: {
        type: Number,
        default: 0,
    },
    recruiterLogin: {
        type: Number,
        default: 0, 
    }
}, { timestamps: true });




uniSchema.methods.trackLogin = function(){
    const now = new Date();
    
    this.loginHistory.push(now);

    
    this.loginHistory = this.loginHistory.filter(login => (now - login) <= 30 * 24 * 60 * 60 * 1000);

    
    if (this.role === 'student') {
        this.studentLogin = this.loginHistory.length;
    } else if (this.role === 'recruiter') {
        this.recruiterLogin = this.loginHistory.length;
    }
};




uniSchema.pre('save', function(next) {
    const now = new Date();
    
    this.loginHistory = this.loginHistory.filter(login => (now - login) <= 30 * 24 * 60 * 60 * 1000);

    // Recalculate login counts
    if (this.role === 'student') {
        this.studentLogin = this.loginHistory.length;
    } else if (this.role === 'recruiter') {
        this.recruiterLogin = this.loginHistory.length;
    }

    next();
});

export const Uni = mongoose.model('Uni', uniSchema);




