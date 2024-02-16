const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true
  },
  thumbnail_src: {
    type: String,
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
  date: {
    type: Date,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  likes: {
    type: Number
  },
  author: {
    type: String,
    required: true
  }
});

const Card = mongoose.model('card', CardSchema);
module.exports = Card;
