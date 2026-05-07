const mongoose = require('mongoose');
const mongourl="mongodb://localhost:27017/notesapp";
mongoose.connect(mongourl)
const db = mongoose.connection;