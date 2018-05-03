const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  artist: { type: String, required: true },
  album: { type: String, required: true }
});


module.exports = mongoose.model('Album', albumSchema);