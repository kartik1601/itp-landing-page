import { connect } from "@/dbConfig/dbConfig";
import User from '@/model/userModel'
import {NextRequest, NextResponse} from 'next/server';

connect();

export async function GET(req: NextRequest) {
    try {
        const res = NextResponse.json({
            message: "Logout Successfully",
            success: true
        })

        res.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0)
        })

        return res;

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}