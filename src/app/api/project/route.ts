import { db } from "../../database";
import { Project } from "../../models";
import { Model } from 'mongoose';


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