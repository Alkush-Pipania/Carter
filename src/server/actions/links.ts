"use server"
import bcrypt from "bcrypt";
import { authOption } from "@/lib/auth";
import { error } from "console";
import { getServerSession } from "next-auth"
import { AddLinkDb, createlinkcarterdb, deleteAccountdb, deltelinkcarddb, folderdatadb, getFolderDataDB, getFoldernameDB, getlinklistdb, getsettingdatadb, getuserdatadb, linkformdetaildb, retrivedatadb, toggleclouddb, updatelinkformdb, updatePassworddb, updateuserdatadb, updateusernamedb, verifyforgotOTPdb, verifyOTPdb, verifyUserdb } from "../db/links";
import { number, string } from "zod";
import { redirect } from "next/navigation"
import exp from "constants";
import prisma from "@/lib/prisma";
import { signOut } from "next-auth/react";

export async function togglecloud(id: string) {
  const { user } = await getServerSession(authOption);
  const user_id = user.id;
  const errorMessage = "There was an error adding it to cloud"
  if (user_id == null) {
    return { error: true, message: errorMessage }
  }

  const isSucces = await toggleclouddb({ user_id, id });


  return {
    message: !isSucces ? "Succesfully added to cloud" : errorMessage,
    changeto: !isSucces.changedto,
    error: !isSucces,
  }
}


export async function deltelinkcard(id: string) {
  const { user } = await getServerSession(authOption);
  const user_id = user.id;
  const errorMessage = "There was an error while deleting it."

  if (!id || !user) {
    return { message: 'secret_Id is required.', status: 400 };
  }

  const isSucces = await deltelinkcarddb(id, user_id);


  return {
    message: isSucces.error == false ? "Successfully deleted" : errorMessage,
    error: isSucces.error,
  }

}

export async function linkformdetail(id: string, user_id: string) {
  if (!id || !user_id) {
    return { error: true, message: "id and user_id is required" }
  }

  const isSucces = await linkformdetaildb(id, user_id);

  return {
    data: isSucces.data,
    error: isSucces.error,
  }
}


export async function updatelinkform(secret_Id: string, values: any) {
  const { user } = await getServerSession(authOption);
  const user_id = user.id;
  const errorMessage = "There was an error while updating the link form"
  if (user_id == null) {
    return { error: true, message: errorMessage }
  }

  const isSucces = await updatelinkformdb(
    secret_Id, values, user_id
  );

  return {
    message: isSucces ? "Succesfully updated" : errorMessage,
    error: !isSucces,
  }
}

export async function retrivedata(userid: string) {
  const user = await getServerSession(authOption);
  if (!user) {
    redirect("/signin");
  }
  const isSucces = await retrivedatadb(userid || user.user.id);

  return {
    error: !isSucces,
    data: isSucces.data,
  }
}

type userdatatype = { username?: string; email?: string }



export async function updateuserdata(userdata: userdatatype) {
  const user = await getServerSession(authOption);
  if (!user) {
    return { error: true, message: "User is not logged in" }
  }
  const errorMessage = "There was an error while updating the user data"
  const user_id = user.user.id;

  const isSucces = await updateuserdatadb(user_id, userdata);

  return {
    message: !isSucces.error ? "Succesfully updated" : errorMessage,
    error: !isSucces,
  }


}

export async function createlinkcarter(values: { name: any }) {
  const user = await getServerSession(authOption);
  const user_id = user.user.id;
  if (!user) {
    return { error: true, message: "User is not logged in" }
  }
  if (!values.name) {
    return { error: true, message: "Name is required" }
  }

  const isSucces = await createlinkcarterdb(values.name, user_id)


  return {
    message: !isSucces.error ? "Succesfully created" : "There was an error while creating the folder",
    error: isSucces.error,
    data: isSucces.data,
  }
}

export async function folderdata(search: string) {
  const user = await getServerSession(authOption);
  if (!user) {
    redirect("/signin");
  }
  const user_id = user.user.id;
  const isSucces = await folderdatadb(user_id, search);

  return {
    data: isSucces.data,
    error: isSucces.error,
  }

}

export async function getuserdata() {
  const user = await getServerSession(authOption);
  if (!user) {
    return { error: true, message: "User is not logged in" }
  }
  const isSucces = await getuserdatadb(user.user.id);

  return {
    data: isSucces.data,
    error: isSucces.error
  }
}

export async function getsettingdata() {
  const user = await getServerSession(authOption);
  if (!user) {
    return { error: true, message: "User is not logged in" }
  }
  const isSucces = await getsettingdatadb(user.user.id);

  return {
    data: isSucces.data,
    error: isSucces.error
  }
}

export async function updateusernameaction(username: any) {
  const auth = await getServerSession(authOption);
  if (!auth) {
    redirect('/signin');
  }
  const isSucces = await updateusernamedb(username, auth.user.id);

  return {
    error: isSucces.error,
    message: isSucces.error ? "There was an error while updating the username" : "Succesfully updated"
  }
}

export async function verifyOTP(value: string, email: string) {
  const auth = await getServerSession(authOption);
  if (!auth) {
    redirect('/signin');
  }

  const isSucces = await verifyOTPdb(value, email);
  if (!isSucces.error) {
    await verifyUserdb(auth.user.id);
  }
  return {
    error: isSucces.error,
    message: isSucces.error ? "There was an error while verifying the OTP" : "Succesfully verified"
  }
}

export async function deleteAccount(mail: any) {
  const { email } = mail;
  const auth = await getServerSession(authOption);

  if (!auth || auth.user.email !== email) {
    return { error: true, message: "Something is up with the email" };
  }

  const isSucces = await deleteAccountdb(email, auth.user.id);



  return {
    error: isSucces.error,
    msg: isSucces.error
      ? "There was an error while deleting the account"
      : "Successfully deleted",
  };
}

export async function emailexist(email: string) {

  if (!email) {
    return { error: true, message: "Email is required" }
  }
  try {
    const isSucces = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (isSucces) {
      return { error: false, message: "Email exists" }
    } else {
      return { error: true, message: "Email does not exist" }
    }
  } catch (e) {
    return { error: true, message: "There was an error while checking the email" }
  }
}

export async function verifyforgotOTP(email: string, otp: string) {
  const isSucces = await verifyforgotOTPdb(otp, email);
  return {
    error: isSucces.error,
    message: isSucces.message
  }
}

export async function updatePassword(password: string,
  email: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const isSucces = await updatePassworddb(hashedPassword,
    email
  );

  return {
    error: isSucces.error,
    message: isSucces.error ? "There was an error while updating the password" : "Succesfully updated"
  }

}

export async function getLinklist(search: string) {
  const session = await getServerSession(authOption);


  if (!session || !session.user) {
    return { redirect: '/login' };
  }

  const isSucces = await getlinklistdb(session.user.id, search);

  return {
    data: isSucces.data,
    error: isSucces.error,
  };
}


type LinkData = {
  url: string;
  title: string;
  description: string;
  userId: string;
  action: string;
};


function validateLinkData(data: LinkData): { isValid: boolean; error?: string } {
  if (!data.url?.trim()) return { isValid: false, error: "URL is required" };
  if (!data.title?.trim()) return { isValid: false, error: "Title is required" };
  if (!data.description?.trim()) return { isValid: false, error: "Description is required" };
  if (!data.userId?.trim()) return { isValid: false, error: "User ID is required" };
  if (!data.action?.trim()) return { isValid: false, error: "Action is required" };

  return { isValid: true };
}




export async function AddLink(url: string, title: string, description: string, userId: string, action: string) {
  try {
    const session = await getServerSession(authOption);
    if (!session && session.user.id == userId) {
      redirect('/signin')
    }
    const validation = validateLinkData({ url, title, description, userId, action });
    if (!validation.isValid) {
      return { error: true, message: validation.error };
    }
    const result = await AddLinkDb(url, title, description, userId, action);
    return {error : false , data : result.data};
  } catch (e) {
    console.error('Error in AddLink:', error);
    return { 
      error: true, 
      message: error instanceof Error ? error.message : "An unexpected error occurred" 
    };
  }

}


export async function getfolderdata (folderId : number , searchvalue : string){
  const session = await getServerSession(authOption);
  if(!session){
    return{redirect : '/signin'}
  }
  if(!folderId){
    return { error : true , message : "folder id is required"}
  }

  const result = await getFolderDataDB(folderId , session.user.id , searchvalue);
  return { error : result.error , data : result?.data}
}

export async function getfoldername(folderId : string){
  const session = await getServerSession(authOption);
  if(!session){
    return{redirect : '/signin'}
  }
  if(!folderId){
    return { error : true , message : "folder id is required"}
  }

  const result = await getFoldernameDB(folderId , session.user.id );
  return { error : result.error , data : result?.data}
}


export async function deleteFolder(folderId: number) {
  try {
    const auth = await getServerSession(authOption)
    const userId = parseInt(auth.user.id, 10);
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: { links: true },
    });

    if (!folder || folder.userID !== userId) {
      return { error: true, message: "Folder not found or unauthorized" };
    }


    const trashedFolder = await prisma.trashFolder.create({
      data: {
        name: folder.name,
        secretKey: folder.secretKey,
        userID: userId,
        createdAt: folder.createdAt,
        links: {
          create: folder.links.map((link) => ({
            secret_Id: link.secret_Id,
            links: link.links,
            title: link.title,
            imgurl: link.imgurl,
            description: link.description,
            createdAt: link.createdAt,
            userID: userId,
          })),
        },
      },
    });

    // Delete folder and links from active tables
    await prisma.linkform.deleteMany({ where: { folderID: folderId } });
    await prisma.folder.delete({ where: { id: folderId } });
    return { error: false, message: "Folder deleted and moved to trash" };
  } catch (err) {
    console.error(err);
    return { error: true, message: "Error deleting folder" };
  }
}
