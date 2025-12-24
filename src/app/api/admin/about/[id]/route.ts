import { NextResponse, NextRequest } from "next/server";
import { db } from "../../../../database";
import { About } from "../../../../models";
import { isValidObjectId, Model } from "mongoose"; // Importa Model

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await db.connect();
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "ID no válido" }, { status: 400 });
    }

    // Usamos el cast (About as Model<any>) para resolver el error de Type Error
    const about = await (About as Model<any>).findByIdAndDelete(id);

    if (!about) {
      return NextResponse.json({ message: "No se encontró el registro" }, { status: 404 });
    }

    return NextResponse.json(about, { status: 200 }); // Status 200 para DELETE exitoso
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Error al eliminar", error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await db.connect();
    const { id } = await params;
    const body = await req.json();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: `El ID ${id} no es válido` },
        { status: 400 } // 400 es mejor para errores de cliente (Bad Request)
      );
    }

    // Usamos el cast (About as Model<any>) aquí también
    const about = await (About as Model<any>).findByIdAndUpdate(id, body, { new: true });

    if (!about) {
      return NextResponse.json({ message: "No se encontró el registro para actualizar" }, { status: 404 });
    }

    return NextResponse.json(
      { message: `Actualizado correctamente`, data: about },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Error al actualizar", error: error.message }, { status: 500 });
  }
}