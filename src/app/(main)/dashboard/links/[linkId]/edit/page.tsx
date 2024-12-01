import { ProductDetailsForm } from "@/components/form/ProductDetailsForm";
import { PageWithBackButton } from "@/components/global/PageWithBackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { authOption } from "@/lib/auth";
import { linkformdetail } from "@/server/actions/links";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export default async function EditLinkPage(
  {
    params,
  }:{
    params: Promise<{linkId: string}>,
  }
){
  const { linkId } = await params;
  const  session = await getServerSession(authOption);
  if(session == null){
    redirect("/")
  }
  const details = await linkformdetail(linkId , session.user.id);
 
  
  

  return(
   <main className=" h-screen   ">
    <PageWithBackButton 
   backButtonHref="/dashboard"
   pageTitle="Edit Link"
   >
    <Tabs className=""  defaultValue="details">
      <TabsList className="bg-washed-purple/washed-purple-400 text-slate-800 font-semibold">
      <TabsTrigger  value="details">Details</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
       <DetailsTAb  product={details.data}/>
      </TabsContent>
    </Tabs>
   </PageWithBackButton>
   </main>
  )
}

type producttype ={
  title: string;
  links: string;
  description: string;
  secret_Id : string;
  
}

function DetailsTAb( {product } : {product : producttype } ){
  

  return(
   <Card className="bg-transparent text-white ">
    <div className=' w-[75%] blur-[100px] rounded-full h-44 absolute bg-brand/brand-primaryblue/50 -z-10 left-20 sm:top-52 top-40' />
    <CardHeader>
      <CardTitle className="text-xl">Linkform Details</CardTitle>
    </CardHeader>
    <CardContent>
      <ProductDetailsForm  product={product}/>
    </CardContent>
   </Card>
  )
}