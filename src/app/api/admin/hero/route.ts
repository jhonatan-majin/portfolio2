import { NextResponse } from "next/server";
import { db } from "../../../database";
import { Hero } from "../../../models";
import { Model } from 'mongoose';

export async function POST(req: Request) {
  try {
    await db.connect();
    const { image, title0, title1, title2, description } = await req.json();
    
    // Validación de campos requeridos
    if (!description) {
      return NextResponse.json(
        { error: "El campo 'description' es requerido" },
        { status: 400 }
      );
    }

    const newHero = new Hero({ 
      image,
      title0,
      title1,
      title2,
      description
    });

    await newHero.save();

    return NextResponse.json(
      { 
        message: "Hero creado exitosamente",
        hero: newHero 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error creating hero:", error);
    return NextResponse.json(
      { error: "Error al crear el hero", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await db.connect();

    const heroList = await (Hero as Model<any>).find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(heroList, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching hero data:", error);
    return NextResponse.json(
      { error: "Error al obtener los datos del hero", details: error.message },
      { status: 500 }
    );
  }
}
