import { NextResponse, NextRequest } from "next/server";
import { db } from "../../../../database";
import { Message } from "../../../../models";
import { Model } from 'mongoose';

const url = process.env.API_URL;

interface Params {
 params: Promise<{ id: string }>
}

export async function DELETE(req: NextRequest, { params }: Params, res: NextResponse) {

 try {
  await db.connect();
  const { id } = await params;

const message = await (Message as Model<any>).findByIdAndDelete(id).lean();

  return new Response(JSON.stringify(message), {
   status: 201,
   headers: { 'Content-Type': 'application/json' }
  });
 } catch (error) {
  console.log(error);
  return new Response(JSON.stringify(error), {
   status: 201,
   headers: { 'Content-Type': 'application/json' }
  });
 }
}

