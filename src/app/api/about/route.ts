import { NextRequest, NextResponse } from 'next/server';
import { db } from "../../database";
import { About } from "../../models";
import { Model } from 'mongoose'; // 1. Importar Model

export async function GET(req: NextRequest) {
  try {
    await db.connect();

    // 2. Usar cast 'as Model<any>' para resolver el error de "not callable"
    // 3. Usar .lean() para que devuelva objetos planos (mejor para Next.js)
    const aboutList = await (About as Model<any>).find().lean();

    return NextResponse.json(aboutList, { 
      status: 200 // Cambiado a 200 (OK) ya que es un GET satisfactorio
    });

  } catch (error: any) {
    console.error("Error en About GET:", error);
    return NextResponse.json(
      { message: "Error al obtener datos", error: error.message }, 
      { status: 500 }
    );
  }
}
