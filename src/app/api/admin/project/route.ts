import { NextResponse } from "next/server";
import { db } from "../../../database";
import { Project } from "../../../models";
import { Model } from 'mongoose';

  export async function POST(req: Request, res: Response) {
    try {
      await db.connect();
      const {image, title, description, github, web, tag1, tag2} = await req.json()
      
      const projectExistense = await (Project as Model<any>).findOne({title}).lean();
      
      if(projectExistense) {
        return NextResponse.json({error: "el proyecto ya existe"})
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
      // await db.disconnect();

      return new Response(JSON.stringify(newProject), {
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

  export async function GET(req: Request, res: Response) {
    try {
      await db.connect();

      const projectList = await (Project as Model<any>).find().lean();

      return new Response(JSON.stringify(projectList), {
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