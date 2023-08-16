import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request, response: Response) {
    const { name, email, password } = await request.json();

    const userExists = await prisma.users.findFirst({
        where: {
            email: email,
        },
    })

    if(userExists) {
        return NextResponse.json({message: "Usuário já existe",}, {status: 400,});
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
        data: {
            name: name,
            email: email,
            password: passwordHash,
        },
    });

    const {password:_ , ...user} = newUser;

    return NextResponse.json({message: "Usuário cadastrado com sucesso",}, {status: 200,});

}


