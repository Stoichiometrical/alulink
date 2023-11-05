const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    yearOfGraduation: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
    },
    eventsOrganized: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
    emailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    bio: {
        type: String,
    },
    currentEmployment: {
        company: String,
        jobTitle: String,
    },
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
