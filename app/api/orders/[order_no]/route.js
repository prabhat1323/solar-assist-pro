import { NextResponse } from "next/server";

export const GET = (req,{params} = context)=>{
    const {order_no} = params;

    return NextResponse.json({
        message : `your order no ${order_no}`
    })
    
}