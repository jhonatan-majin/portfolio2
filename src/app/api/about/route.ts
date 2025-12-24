import { NextRequest, NextResponse } from 'next/server';
import { db } from "../../database";
import { About } from "../../models";
import { Model } from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    await db.connect();

    // Forzamos a TS a tratar a About como un Modelo de Mongoose
    const aboutList = await (About as Model<any>).find().lean();

    return NextResponse.json(aboutList, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}