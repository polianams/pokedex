import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: Request, response: Response) {
    const { email, password } = await request.json();
    
    const userAccount = await prisma.users.findFirst({
        where: {
            email: email,
        },
    });

    if(!userAccount) {
        return NextResponse.json({message: "Email ou senha inválido",}, {status: 404,});
    }

    const veryfyPassword = await bcrypt.compare(password, userAccount.password);

    if (!veryfyPassword) {
        return NextResponse.json({message: "Email ou senha inválido",}, {status: 400,});
    }

    const token = jwt.sign({id: userAccount.id}, process.env.JWT_SECRET ?? '', {
        expiresIn: '1h'
    });

    const {password:_ , ...user} = userAccount;

    return NextResponse.json({
        user: user,
        token: token
    }, {status: 200,});
}


