import mongoose, { Schema, model, models } from 'mongoose';

const projectSchema = new Schema({
    image: { type: String },
    title: { type: String },
    description: { type: String },
    github: { type: String },
    web: { type: String },
    tag1: { type: String, default: "All" },
    tag2: { type: String }
}, {
    timestamps: true
});

// Crear el índice de texto
projectSchema.index({ title: 'text' });

/**
 * Explicación:
 * mongoose.models.Project: Busca si el modelo ya fue compilado anteriormente.
 * mongoose.model('Project', projectSchema): Lo compila solo si es la primera vez.
 */
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;

