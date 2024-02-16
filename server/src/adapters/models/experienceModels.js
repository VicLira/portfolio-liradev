const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        required: true
    },
    image_url: {
        type: String,
        require: true
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    type: {
        type: String,
        required: true
    }
});

const Experience = mongoose.model('experience', ExperienceSchema);
module.exports = Experience;