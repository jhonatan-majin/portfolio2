import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../database";
import { User } from "../../../models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'
import { Model } from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    await db.connect(); // Asegúrate de llamar a la conexión dentro del POST

    const reqBody = await request.json();
    const { email, password } = reqBody;

    // 1. Buscamos el usuario y le damos un tipo explícito "any" o una interfaz 
    // para evitar que TS piense que es un array.
    const user = await (User as Model<any>).findOne({ email }).lean() as any;

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // 2. Ahora TS te permitirá acceder a .password
    const validPassword = await bcryptjs.compare(password, user.password);
    
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // 3. Crear data para el token
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // 4. Crear token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    // 5. Configurar respuesta y cookies
    // Importante: En Next.js 14/15, cookies().set() se puede usar directamente 
    // pero la respuesta debe retornarse después.
    const cookieStore = cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 día en segundos
      path: '/',
    });

    return NextResponse.json({
      message: "Login successful",
      success: true,
    });

  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}