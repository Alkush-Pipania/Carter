import prisma from "@/lib/prisma"


export async function waitinglist(email : string){
  try{
    const res = await prisma.watinglist.create({
      data : {
        email : email
      }
    })
    return {error : false , msg : "succesfull"}
  }catch(e){
    return { error : true , msg : "error"}
  }
}
