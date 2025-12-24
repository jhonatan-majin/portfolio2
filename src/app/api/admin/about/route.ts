import { NextResponse } from "next/server";
import { db } from "../../../database";
import { About } from "../../../models";
import { Model } from 'mongoose';


  export async function POST(req: Request, res: Response) {
    try {

      await db.connect();

      const {
        image,
        title, 
        description,
        skill0,
        skill1,
        skill2,
        skill3,
        skill4,
        skill5,
        education0,
        education1,
        education2,
        certification0,
        certification1,
        certification2,
      } = await req.json()
      
      const newAbout = new About({ 
        image,
        title,
        description,
        skill0,
        skill1,
        skill2,
        skill3,
        skill4,
        skill5,
        education0,
        education1,
        education2,
        certification0,
        certification1,
        certification2,
      });
      await newAbout.save();
      return new Response(JSON.stringify(newAbout), {
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

      const aboutList = await (About as Model<any>).find().lean();

      return new Response(JSON.stringify(aboutList), {
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