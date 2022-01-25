const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
title: String,
descriptionTask: String,
valor: Number,
createdAt: {
    type: Date,
    default: new Date()
    }
})

module.exports = mongoose.model('tasks',TaskSchema);