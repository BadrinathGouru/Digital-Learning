const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    address: { type: String, default: '' },
    district: { type: String, default: 'Patiala' },
    state: { type: String, default: 'Punjab' },
    contactPhone: { type: String, default: '' },
    adminRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalStudents: { type: Number, default: 0 },
    totalTeachers: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);
