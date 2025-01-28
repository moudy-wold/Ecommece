"use server"
import { cookies } from "next/headers"

export async function GetTokenInSsr() {    
    return (await cookies()).get("token")
  
}