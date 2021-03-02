import * as mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    body: { type: String, required: true, maxLength: 255 },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, required: true },
    public: { type: Boolean, required: true }
});

export default mongoose.model('Post', postSchema);