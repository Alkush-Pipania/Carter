"use server"
import prisma from "@/lib/prisma"
import axios from "axios";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Pinecone } from '@pinecone-database/pinecone'

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

      },
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
      },
      cacheStrategy: { ttl: 60 },
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
      },
      cacheStrategy: { ttl: 60 },
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

export async function folderdatadb(user_id: string, search: string) {
  if (!user_id) {
    return { error: true, message: "User ID is required" };
  }

  try {
    const data = await prisma.folder.findMany({
      where: {
        userID: parseInt(user_id, 10),
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            links: true
          }
        }
      },
      cacheStrategy: { ttl: 60 },
    });

    return { error: false, data: data };
  } catch (error) {
    return { error: true, message: "There was an error while fetching the folder data" };
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
      },
      cacheStrategy: { ttl: 60 },
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
        where: {
          userID: parseInt(user_id, 10)
        }
      })
      await tx.folder.deleteMany({
        where: {
          userID: parseInt(user_id, 10)
        }
      })
      await tx.user.delete({
        where: {
          id: parseInt(user_id, 10),
          email: email
        }
      })
    })
    return { error: false, message: "success" }
  } catch (e) {
    console.log(e)
    return { error: true, message: "error" }
  }
}


export async function verifyforgotOTPdb(otp: string, email: string) {
  if (!otp || !email) {
    return { error: true, message: "something up with the inputs" }
  }
  try {
    const record = await prisma.forgotPassword.findFirst({
      where: {
        email: email,
        token: otp
      }
    })
    if (!record) {
      return { error: true, message: "invalid otp" }
    }
    return { error: false, message: "success" }
  } catch (e) {
    return { error: true, message: "error" }
  }
}


export async function updatePassworddb(hashedpassword: string, email: string) {
  if (!hashedpassword || !email) {
    return { error: true, message: "something up with the inputs" }
  }
  try {
    await prisma.user.update({
      where: {
        email: email
      },
      data: {
        password: hashedpassword
      }
    })
    return { error: false, message: "success" }
  } catch (e) {
    return { error: true, message: "error" }
  }
}

export async function getlinklistdb(userid: string, search: string) {
  try {
    // If search is empty, return all links
    if (!search || search.trim() === '') {
      const linklist = await prisma.linkform.findMany({
        where: {
          folderID: null,
          userID: parseInt(userid, 10),
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      return { error: false, data: linklist };
    }

    // Normalize search term
    const searchTerm = search.trim().toLowerCase();

    const linklist = await prisma.linkform.findMany({
      where: {
        AND: [
          { userID: parseInt(userid, 10) },
          {
            OR: [
              // Search in title with contains
              {
                title: {
                  contains: searchTerm,
                  mode: 'insensitive'  // Case insensitive search
                }
              },
              // Search in description
              {
                description: {
                  contains: searchTerm,
                  mode: 'insensitive'
                }
              },
              // Search in links
              {
                links: {
                  contains: searchTerm,
                  mode: 'insensitive'
                }
              },
              // Search for exact matches in tobefind items
              {
                AND: [
                  { tobefind: true },
                  {
                    OR: [
                      { title: { equals: searchTerm, mode: 'insensitive' } },
                      { description: { equals: searchTerm, mode: 'insensitive' } }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      orderBy: [
        // Prioritize items marked as tobefind
        { tobefind: 'desc' },
        // Then sort by creation date
        { createdAt: 'desc' }
      ],
      // Include related folder information if needed
      include: {
        folder: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return {
      error: false,
      data: linklist,
      totalResults: linklist.length,
      searchTerm: searchTerm
    };
  } catch (e) {
    console.error('Search error:', e);
    return {
      error: true,
      message: "Failed to perform search",
      details: e instanceof Error ? e.message : "Unknown error"
    };
  }
}

type LinkAction = {
  type: 'GLOBAL' | 'FOLDER';
  folderId?: number;
};


function parseAction(action: string): LinkAction {
  console.log(action)
  if (action.toLowerCase() === 'global') {
    return { type: 'GLOBAL' };
  }

  const folderId = parseInt(action, 10);
  if (isNaN(folderId)) {
    throw new Error('Invalid action: must be "global" or a valid folder ID');
  }

  return { type: 'FOLDER', folderId };
}

const genAI = new GoogleGenerativeAI('AIzaSyBQU_NvXviDK6XnFC69eAwc8_Pn1055HOU');
const pinecone = new Pinecone({ apiKey: 'pcsk_2Fv3cy_Q2fNvrNfV8eotfdhxfvb8A8DtV6SKxqMqbJ59JZJRyVWBztHXytHB2C9WRBmuUU' });

async function generateGeminiEmbedding(text: string) {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(text);
  return result.embedding.values; // Returns the 768-dimension vector
}

export async function AddLinkDb(url: string, title: string, description: string, userId: string, action: string) {

  try {
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid user ID');
    }
    const linkAction = parseAction(action);

    let imageURl = "no image";

    try {
      const apiResponse = await axios.get(
        `${process.env.Image_API_RETRIVE_URL}=${url}`
      );
      imageURl = apiResponse.data.image;
      console.log(imageURl)
    } catch (e) {
      console.log(e)
      const imgfallback = await prisma.fallbackImage.findMany({
        orderBy: {
          id: 'asc',
        },
        take: 1,
        skip: Math.floor(Math.random() * (await prisma.fallbackImage.count())),
      })
      imageURl = imgfallback[0].imgurl;
    }

    const baseLinkData = {
      links: url,
      imgurl: imageURl,
      title: title,
      description: description,
      user: {
        connect: { id: parsedUserId },
      },
    };

    const link = await prisma.linkform.create({
      data: linkAction.type === 'FOLDER'
        ? {
          ...baseLinkData,
          folder: {
            connect: { id: linkAction.folderId }
          }
        }
        : baseLinkData
    });

    return {
      error: false,
      data: link,
      message: "Link created successfully"
    };


  } catch (error) {
    console.log('Error in AddLinkDb:', error);

    if (error instanceof Error) {
      // Handle specific database errors
      if (error.message.includes('Foreign key constraint failed')) {
        return {
          error: true,
          message: "The specified folder does not exist"
        };
      }
    }

    return {
      error: true,
      message: error instanceof Error
        ? error.message
        : "Failed to create link"
    };
  }
}



export async function getFolderDataDB(folderId: number, userId: string, search: string) {
  try {
    const link = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userID: parseInt(userId, 10)
      },
      select: {
        id: true,
        links: {
          where: {
            OR: [
              {
                title: {
                  contains: search,
                  mode: 'insensitive'
                }
              },
              {
                description: {
                  contains: search,
                  mode: 'insensitive'
                }
              },
              {
                links: {
                  contains: search,
                  mode: 'insensitive'
                }
              }
            ]
          }
        }
      },
    });
    return { error: false, data: link }
  } catch (e) {
    return { error: true, message: "error" }
  }
}


export async function getFoldernameDB(folderId: string, userId: string) {
  try {
    const link = await prisma.folder.findFirst({
      where: {
        id: parseInt(folderId, 10),
        userID: parseInt(userId, 10)
      },
      select: {
        name: true,
        id: true,
      }
    })
    return { error: false, data: link }
  } catch (e) {
    return { error: true, message: "error" }
  }
}

export async function gettrashFolderDatadb(userId: string) {
  try {
    const res = await prisma.trashFolder.findMany({
      where: {
        userID: parseInt(userId, 10),
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            links: true
          }
        },
      }
    })
    console.log(res)

    const formattedData = res.map((folder) => ({
      folderId: folder.id,
      folderName: folder.name,
      numberOfLinks: folder._count.links,
    }));

    return { error: false, data: formattedData }
  } catch (e) {
    return { error: true, message: "error" }
  }
}

export async function restoreTrashFolderDB(userId: string, folderId: string) {
  try {
    const restoredData = await prisma.$transaction(async (tx) => {
      const trashFolder = await tx.trashFolder.findFirst({
        where: {
          id: parseInt(folderId, 10),
          userID: parseInt(userId, 10)
        },
        include: { links: true },
      })
      if (!trashFolder) {
        return { error: true, message: "Folder not found" }
      }
      const restoredFolder = await tx.folder.create({
        data: {
          id: trashFolder.id,
          name: trashFolder.name,
          secretKey: trashFolder.secretKey,
          userID: trashFolder.userID,
          createdAt: trashFolder.createdAt,
          updatedAt: new Date(),
        },
      });

      const restoredLinks = await Promise.all(
        trashFolder.links.map(async (trashLink) => {
          return tx.linkform.create({
            data: {
              secret_Id: trashLink.secret_Id,
              links: trashLink.links,
              title: trashLink.title ?? "",
              imgurl: trashLink.imgurl,
              description: trashLink.description ?? "",
              createdAt: trashLink.createdAt,
              userID: trashLink.userID,
              folderID: restoredFolder.id, // Assign to restored folder
            },
          });
        })
      );

      await tx.linkformTrash.deleteMany({
        where: {
          trashFolderID: parseInt(folderId, 10),
          userID: parseInt(userId, 10)
        },
      });

      await tx.trashFolder.delete({
        where: { id: parseInt(folderId, 10) },
      });
      return { restoredFolder, restoredLinks }
    })
    console.log(restoredData)
    return { error: false, data: restoredData.restoredFolder, message: "success" };
  } catch (e) {
    console.log(e)
    return { error: true, message: "some error occured" }
  }
}

export async function deleteTrashFolderDB(userId: string, folderId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.linkformTrash.deleteMany({
        where: {
          userID: parseInt(userId, 10),
          trashFolderID: parseInt(folderId, 10)
        }
      })
      await tx.trashFolder.delete({
        where: {
          id: parseInt(folderId, 10),
          userID: parseInt(userId, 10)
        }
      })
    })
    return { error: false, message: "success" }
  } catch (e) {
    return { error: true, message: "error" }
  }
}


export async function deleteAllTrashFolderDB(userId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.linkformTrash.deleteMany({
        where: {
          userID: parseInt(userId, 10)
        }
      })
      await tx.trashFolder.deleteMany({
        where: {
          userID: parseInt(userId, 10)
        }
      })
    })
    return { error: false, message: "success" }
  } catch (e) {
    return { error: true, message: "error" }
  }
}


export async function togglefolderCloudDB(userid: string, folderId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      await prisma.linkform.updateMany({
        where: {
          userID: parseInt(userid, 10),
          folderID: parseInt(folderId, 10)
        },
        data: {
          tobefind: true,
        }
      })
    })
    return { error: false, message: "succesfull" }
  } catch (e) {
    return { error: true, message: "error" }
  }
}

