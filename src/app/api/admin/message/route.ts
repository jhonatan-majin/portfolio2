import { NextResponse } from "next/server";
import { db } from "../../../database";
import { Message } from "../../../models";
import { Model } from 'mongoose';

  export async function POST(req: Request, res: Response) {
    try {
      await db.connect();
      const { email, subject, message } = await req.json()
      
      const newMessage = new Message({ 
        email, 
        subject, 
        message
      });
      await newMessage.save();

      return new Response(JSON.stringify(newMessage), {
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

      const messageList = await (Message as Model<any>).find().lean();

      return new Response(JSON.stringify(messageList), {
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