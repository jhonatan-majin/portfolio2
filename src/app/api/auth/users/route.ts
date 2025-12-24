import { db } from "../../../database";
import { User } from "../../../models";
import { Model } from 'mongoose';

export async function GET(req: Request, res: Response) {
  try {
    await db.connect();

    const UserList = await (User as Model<any>).find().lean();
    
    return new Response(JSON.stringify(UserList), {
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