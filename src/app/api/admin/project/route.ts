import { NextResponse } from "next/server";
import { db } from "../../../database";
import { Project } from "../../../models";
import { Model } from 'mongoose';

export async function POST(req: Request) {
  try {
    await db.connect();
    const { image, title, description, github, web, tag1, tag2 } = await req.json();
    
    // Validación de campos requeridos
    if (!title || !description) {
      return NextResponse.json(
        { error: "Los campos 'title' y 'description' son requeridos" },
        { status: 400 }
      );
    }

    const projectExistence = await (Project as Model<any>).findOne({ title }).lean();
    
    if (projectExistence) {
      return NextResponse.json(
        { error: "El proyecto ya existe" },
        { status: 409 }
      );
    }

    const newProject = new Project({ 
      image,
      title,
      description, 
      github, 
      web,
      tag1,
      tag2
    });

    await newProject.save();

    return NextResponse.json(
      { 
        message: "Proyecto creado exitosamente",
        project: newProject 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Error al crear el proyecto", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await db.connect();

    const projectList = await (Project as Model<any>).find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(projectList, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Error al obtener los proyectos", details: error.message },
      { status: 500 }
    );
  }
}
