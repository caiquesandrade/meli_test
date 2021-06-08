const mongoose = require('mongoose');

const Dna = new mongoose.Schema({
    form_life: {
        type: String,
        required: true
    },
    dna: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});


mongoose.model('dna', Dna);