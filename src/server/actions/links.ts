"use server"

import { authOption } from "@/lib/auth";
import { error } from "console";
import { getServerSession } from "next-auth"
import { deltelinkcarddb, linkformdetaildb, retrivedatadb, toggleclouddb, updatelinkformdb, updateuserdatadb } from "../db/links";
import { number, string } from "zod";

export async function togglecloud(id : string){
  const { user } = await getServerSession(authOption);
  const user_id = user.id;
  const errorMessage = "There was an error adding it to cloud"
  if(user_id == null){
    return {error : true , message : errorMessage}
  }
 
  const isSucces = await toggleclouddb({user_id , id});


  return{
    message : !isSucces ? "Succesfully added to cloud" : errorMessage,
    changeto : !isSucces.changedto,
    error : !isSucces,
  }
}


export async function deltelinkcard(id : string){
  const { user } = await getServerSession(authOption);
  const user_id = user.id;
  const errorMessage = "There was an error while deleting it."

  if (!id || !user) {
    return { message: 'secret_Id is required.' , status: 400 };
  }

  const isSucces = await deltelinkcarddb(id , user_id);


  return{
    message : isSucces.error == false ? "Successfully deleted" : errorMessage,
    error : isSucces.error,
  }

}

export async function linkformdetail(id : string , user_id : string){
   if(!id || !user_id){
    return {error : true , message : "id and user_id is required"}
   }

   const isSucces = await linkformdetaildb(id , user_id);

   return{
     data : isSucces.data,
     error : isSucces.error,
   }
}


export async function updatelinkform(secret_Id : string ,values : any){
  const { user } = await getServerSession(authOption);
  const user_id = user.id;
  const errorMessage = "There was an error while updating the link form"
  if(user_id == null){
    return {error : true , message : errorMessage}
  }

  const isSucces = await updatelinkformdb(
    secret_Id , values , user_id
  );

  return{
    message : !isSucces ? "Succesfully updated" : errorMessage,
    error : !isSucces,
  }
}

export async function retrivedata(userid : string){
  const { user } = await getServerSession(authOption);
  const isSucces = await retrivedatadb(userid || user.id);

  return{
    error : !isSucces,
    data : isSucces.data,
  }
}

type userdatatype ={ username?: string ; email?: string}
  


export async function updateuserdata(userdata : userdatatype ){
 const user = await getServerSession(authOption);
 if(!user){
   return {error : true , message : "User is not logged in"}
 }
 const errorMessage = "There was an error while updating the user data"
  const user_id = user.user.id;

  const isSucces = await updateuserdatadb(user_id , userdata);

  return{
    message : !isSucces.error ? "Succesfully updated" : errorMessage,
    error : !isSucces,
  }


}
