import { connect } from "@/dbConfig/dbConfig";
import User from '@/model/userModel'
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
    try {
        
        const reqBody = await req.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "User Does not exists!"},{status:400})
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({error: "Check credentials!"},{status:400})
        }

        if (!user.isAdmin) {
            return NextResponse.json({ error: "Access denied! User is not an admin." }, { status: 403 });
        }
        if (!user.isVerified) {
            return NextResponse.json({ error: "User not verified!" }, { status: 403 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '3d'})

        const response = NextResponse.json({
            message: "Logged In successfully!",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}