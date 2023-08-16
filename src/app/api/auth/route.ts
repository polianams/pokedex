import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';


const prisma = new PrismaClient();

type JwtPayload = {
    id: number;
}

export async function GET(request: Request, response: Response) {

    const headersList = new Headers(request.headers);
    const authorizationHeader = headersList.get("authorization");

    if(!authorizationHeader) {
        return NextResponse.json({message: "Não autorizado",}, {status: 401,});
    }

    const token = authorizationHeader.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;

    const userAccount = await prisma.users.findFirst({
        where: {
            id: id,
        },
    });

    if(!userAccount) {
        return NextResponse.json({message: "Não autorizado",}, {status: 401,});
    }

    const {password:_ , ...user} = userAccount;

    return NextResponse.json(user, {status: 200,});

}


