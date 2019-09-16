const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: String,
    gender: String,
    email: String,
    phoneNumber: Number,
    contactPreference: String,
    dateOfBirth: Date,
    department: String,
    isActive: Boolean,
    photoPath: String,
}, {
    timestamps: true
});


module.exports = mongoose.model('Employees', EmployeeSchema);