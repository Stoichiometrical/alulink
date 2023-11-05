const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        enum: ['professional development', 'networking', 'campus events'],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumni',
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
