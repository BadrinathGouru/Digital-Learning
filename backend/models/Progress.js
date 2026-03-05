const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
    attemptedAt: { type: Date, default: Date.now },
    answers: [{
        questionId: { type: mongoose.Schema.Types.ObjectId },
        answer: { type: String },
    }],
    score: { type: Number, default: 0 },
    passed: { type: Boolean, default: false },
    timeTaken: { type: Number, default: 0 },
});

const progressSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
    lessonStatus: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'not_started',
    },
    lessonProgressPct: { type: Number, default: 0 },
    quizAttempts: [quizAttemptSchema],
    bestScore: { type: Number, default: 0 },
    syncedAt: { type: Date },
    createdOffline: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
