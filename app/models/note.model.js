const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
    title: String,
    author: String,
    content: String
}, {
    timeStamps: true
});

module.exports = mongoose.model('Note', noteSchema);

