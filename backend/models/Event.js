import mongoose from 'mongoose';

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
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumni', 
    }],
    imageUrl: {
        type: String,
        default: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    location: {
        type: String
    }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
