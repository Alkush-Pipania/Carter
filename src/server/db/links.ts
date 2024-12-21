"use server"
import prisma from "@/lib/prisma"
import { error } from "console";
import { FaLastfmSquare } from "react-icons/fa";

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
      select: {
        username: true,
        email: true,
        secretkey: true,
      }
    })

    return { error: false, data: userdata }
  } catch (e) {
    return { error: true, message: "error" }
  }
}


export async function updateuserdatadb(user_id: string, userdata: any) {
  try {
    await prisma.user.update({
      where: {
        id: parseInt(user_id, 10)
      },
      data: {
        username: userdata.username,
      }
    })
    return { error: false, message: "success" }
  } catch (e) {
    return { error: true, message: "error" }
  }
}

export async function verificationq(user_id: string) {
  if (!user_id) {
    return { error: true, message: "error" }
  }
  try {
    const verify = await prisma.user.findFirst({
      where: {
        id: parseInt(user_id, 10)
      },
      select: {
        varified: true
      }
    })
    return { error: false, data: verify }
  } catch (e) {
    console.log(e)
  }
}

export async function createlinkcarterdb(name: string, user_id: string) {
  if (!user_id) {
    return { error: true, message: "error" }
  }

  try {
    const createlinkcart = await prisma.folder.create({
      data: {
        name: name,
        userID: parseInt(user_id, 10)
      },
    })
    return { error: false, message: "successfully created!", data: createlinkcart }
  } catch (e) {
    return { error: true, message: "error" }
  }
}

export async function folderdatadb(user_id: string) {
  if (!user_id) {
    return { error: true, message: "error" }
  }
  try {
    const data = await prisma.folder.findMany({
      where: {
        userID: parseInt(user_id, 10)
      }
    })
    return { error: false, data: data }
  } catch (error) {
    return { error: true, message: "There was an error while fetching the folder data" }
  }
}

export async function getuserdatadb(userId: string) {
  if (!userId) {
    return { error: true, message: "error" }
  }
  try {
    const data = await prisma.user.findFirst({
      where: {
        id: parseInt(userId, 10)
      },
      select: {
        username: true,
      }
    })
    return { error: false, data: data }
  } catch (e) {
    return { error: true, message: "error" }
  }
}

export async function getsettingdatadb(userId: string) {
  if (!userId) {
    return { error: true, message: "error" }
  }
  try {
    const data = await prisma.user.findFirst({
      where: {
        id: parseInt(userId, 10)
      },
      select: {
        username: true,
        email: true,
        varified: true,
      }
    })
    return { error: false, data: data }
  } catch (e) {
    return { error: true, message: "error" }
  }

}

export async function updateusernamedb(data: { username: string }, userId: string) {
  if (!data) {
    return { error: true, message: "no username given" }
  }
  if (!userId) {
    return { error: true, message: "error" }
  }
  try {
    await prisma.user.update({
      where: {
        id: parseInt(userId, 10)
      },
      data: {
        username: data.username,
      }
    })
    return { error: false, message: "success" }
  } catch (e) {
    console.log(e)
    return { error: true, message: "error" }
  }
}

export async function verifyOTPdb(value: any, email: string) {
  if (!value) {
    return { error: true, message: "no otp given" }
  }
  try {
    await prisma.verification.findFirst({
      where: {
        email: email,
        token: value,
      }
    })
    return { error: false, message: "success" }
  } catch (e) {
    return { error: true, message: "error" }
  }
}

export async function verifyUserdb(user_id: string) {
  if (!user_id) {
    return { error: true, message: "error" }
  }
  try {
    await prisma.user.update({
      where: {
        id: parseInt(user_id, 10)
      },
      data: {
        varified: true
      }
    })
    return { error: false, message: "success" }
  } catch (e) {
    return { error: true, message: "error" }
  }
}

export async function deleteAccountdb(email: string,
  user_id: string
) {

  try {
    await prisma.$transaction(async (tx) => {
      await tx.linkform.deleteMany({
        where : {
          userID : parseInt(user_id , 10)
        }
      })
      await tx.folder.deleteMany({
        where : {
          userID : parseInt(user_id , 10)
        }
      })
      await tx.user.delete({
        where : {
          id : parseInt(user_id , 10),
          email : email
        }
      })
    })
    return { error : false , message : "success"}
  } catch (e) {
    console.log(e)
    return { error: true, message: "error" }
  }
}


export async function verifyforgotOTPdb(otp : string , email : string){
  if(!otp || !email){
    return { error : true , message : "something up with the inputs"}
  }
  try{
    const record =  await prisma.forgotPassword.findFirst({
      where : {
        email : email,
        token : otp
      }
    })
    if(!record){
      return { error : true , message : "invalid otp"}
    }
    return { error : false , message : "success"}
  }catch(e){
    return { error : true , message : "error"}
  }
}


export async function updatePassworddb(hashedpassword : string , email : string){
  if(!hashedpassword || !email){
    return { error : true , message : "something up with the inputs"}
  }
  try{
    await prisma.user.update({
      where : {
        email : email
      },
      data : {
        password : hashedpassword
      }
    })
    return { error : false , message : "success"}
  }catch(e){
    return { error : true , message : "error"}
  }
}