import mongoose, { Schema, model, Model } from 'mongoose';
// import { IMessage } from '../interfaces';

const messageSchema = new Schema({
    email: { type: String },
    subject: { type: String },
    message: { type: String },
}, {
    timestamps: true
});

// Crear el índice de texto
messageSchema.index({ title: 'text' });

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;