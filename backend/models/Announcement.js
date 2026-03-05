const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
    targetGrade: { type: String, default: 'all' },
    language: { type: String, enum: ['English', 'Punjabi', 'Hindi'], default: 'English' },
    isRead: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
