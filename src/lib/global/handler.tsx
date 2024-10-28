import prisma from "../prisma";
import { getServerSession } from "next-auth";
import { authOption } from "../auth";


export async function getLinklist(){
  const session = await getServerSession(authOption);
 
  
  if(!session || !session.user){
    return { redirect: '/login' };
  }

  const linklist = await prisma.linkform.findMany({
    where : {
      userID : Number(session.user.id),
    },
  });
  return {
    data : linklist,
  };
}



export async function addLink({ url , title , description}: {url : string , title : string , description : string}) {
  
  const session = await getServerSession(authOption);
  
  
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  try {
    
    const link = await prisma.linkform.create({
      data: {
        links: url,
        title: title,
        description:description,
        user: {
          connect: { id: session.user.id }
        }
      }
    });

    
    return link;
  } catch (error) {
    console.error("Error adding link:", error);
    throw new Error("Failed to add link");
  }
}

export async function LinkForm (){
  
}
