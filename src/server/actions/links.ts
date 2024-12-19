"use server"
import prisma from "@/lib/prisma"


export async function waitinglist(email : string){
  try{
    await prisma.watinglist.create({
      data : {
        email : email
      }
    })
    return {error : false , msg : "succesfull"}
  }catch(e){
    console.log(e)
    return { error : true , msg : "error"}
  }
}
