import mongoose, { Schema, model, Model } from 'mongoose';
// import { IAbout } from '../interfaces';

const aboutSchema = new Schema({
    image: { type: String },
    title: { type: String },
    description: { type: String },
    skill0: { type: String },
    skill1: { type: String },
    skill2: { type: String },
    skill3: { type: String },
    skill4: { type: String },
    skill5: { type: String },
    education0: { type: String },
    education1: { type: String },
    education2: { type: String },
    certification0: { type: String },
    certification1: { type: String },
    certification2: { type: String },
}, {
    timestamps: true
});

// Crear el índice de texto
aboutSchema.index({ title: 'text' });

const About = mongoose.models.About || mongoose.model('About', aboutSchema);

export default About;

