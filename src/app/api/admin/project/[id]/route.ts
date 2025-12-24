import { NextResponse, NextRequest } from "next/server";
import { db } from "../../../../database";
import { Project } from "../../../../models";
// import { IProject } from "../../../../interfaces";
import { isValidObjectId } from "mongoose";
import { Model } from 'mongoose';

const url = process.env.API_URL;

interface Params {
  params: Promise<{id: string}>
}


   export async function GET(req: NextRequest, {params}: Params, res: NextResponse) {
  
    try {
      await db.connect();
      const { id } = await params;

      const project = await (Project as Model<any>).findById(id).lean();
      
    return new Response(JSON.stringify(project), {
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
  


  export async function DELETE(req: NextRequest, {params}: Params, res: NextResponse) {
  
    try {
      await db.connect();
      const { id } = await params;

      const project = await (Project as Model<any>).findByIdAndDelete(id).lean();

    return new Response(JSON.stringify(project), {
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

  export async function PUT(req: NextRequest, {params}: Params, res: NextResponse) {
  
    try {
      await db.connect();

      const { id } = await params;

      const body = await req.json();


      // const { image, title, github, web, description} = body;

      if (!isValidObjectId(id)) {
        return NextResponse.json(
              { message: `El ID ${id} del projecto no es válido` },
              { status: 404 }
            );
      }

  
      const project = await (Project as Model<any>).findByIdAndDelete(id, body).lean();


    //  await roject.updateOne(req.body);
    return NextResponse.json({message: `Proyecto con el ID ${id} actualizado`, data: body}, { status: 200 });

    return new Response(JSON.stringify(project), {
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

