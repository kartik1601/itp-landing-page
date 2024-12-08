import { connect } from "@/dbConfig/dbConfig";
import User from '@/model/userModel'
import {NextRequest, NextResponse} from 'next/server';
import { getDataFromToken } from "@/helper/getDataFromToken";

connect();

export async function GET(req: NextRequest) {
    // extract data from token
    const userId = await getDataFromToken(req);
    const user = await User.findOne({_id: userId}).select("-password");

    if(!user){
        return NextResponse.json({error: "User does not exist!"}, {status: 400})
    }

    if (!user.isAdmin || !user.isVerified) {
        return NextResponse.json({ error: "Access denied! User is not authenticated!" }, { status: 403 });
    }

    return NextResponse.json({
        message: "User found",
        data: user
    })
}