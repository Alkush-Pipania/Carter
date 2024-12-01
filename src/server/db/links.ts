"use server"
import prisma from "@/lib/prisma"
import { error } from "console";

export async function toggleclouddb({
  user_id,
  id
}: {
  user_id: number,
  id: string
}) {
  try {
    const linkform = await prisma.linkform.findFirst({
      where: {
        secret_Id: id,

      }
    })

    await prisma.linkform.update({
      where: {
        secret_Id: id,
      },
      data: {
        tobefind: !linkform.tobefind,
      },
    });
    return { error: false, message: "success", changedto: linkform.tobefind };
  } catch (error) {
    return { error: true, message: error };
  }
}

export async function deltelinkcarddb(id: string, user_id: string) {
  try {
    const deleteLinkform = await prisma.linkform.deleteMany({
      where: {
        secret_Id: id,
        userID: parseInt(user_id, 10),
      },
    });


    return { error: false, message: "success" }
  } catch (e) {
    return { error: true, message: "error" }
  }
}

export async function linkformdetaildb(id: string, user_id: string) {
  try {
    const linkform = await prisma.linkform.findFirst({
      where: {
        secret_Id: id,
        userID: parseInt(user_id, 10),
      },
      select: {
        links: true,
        title: true,
        description: true,
        secret_Id: true,
      }
    })
    return { error: false, data: linkform }
  } catch (e) {
    return { error: true }
  }
}

export async function updatelinkformdb(
  secret_Id: string,
  values: any,
  user_id: string,

) {

  try {
    const linkform = await prisma.linkform.update({
      where: {
        secret_Id: secret_Id,
        userID: parseInt(user_id, 10),
      },
      data: {
        links: values.url,
        title: values.title,
        description: values.description,
      }
    })

    return { error: false, message: "success" }
  } catch (e) {

    return { error: true, message: "error" }
  }

}

export async function retrivedatadb(userid: string) {
  try {
    const userdata = await prisma.user.findFirst({
      where: {
        id: parseInt(userid, 10)
      },
      select:{
        username : true,
        email : true,
        secretkey : true,
      }
    })

    return { error :  false , data : userdata}
  }catch(e){
    return {error : true , message : "error"}
  }
}


export async function updateuserdatadb(user_id : string , userdata : any){
  try{
    await prisma.user.update({
      where : {
        id : parseInt(user_id , 10)
      },
      data : {
        username : userdata.username,
        email : userdata.email,
      }
    })
    return { error: false, message: "success" }
  } catch(e){
    return { error: true, message: "error" }
  }
}