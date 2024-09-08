import mongoose from 'mongoose' 

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [
        {
            timeStamp: {
                type: Number
            }
        }
    ]
}, {
    timestamps: true // Use "timestamps" instead of "timeStamp"
});

export const URL = mongoose.model('url', urlSchema);

