import { useState, useEffect } from "react";
import { retrivedata } from "@/server/actions/links";
import { useToast } from "@/hooks/use-toast";
import { EllipsisVertical } from 'lucide-react';
import { Editprofile } from "../form/Editprofile";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Badge } from "../ui/badge";
import { verificationq } from "@/server/db/links";
import { Button } from "../ui/button";
import { generateVerificationToken } from "@/lib/token";
import Email from "next-auth/providers/email";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Rightmenu({ userid }: { userid: string }) {
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false); 
  const [verfication, setVerficationq] = useState<any>(false);
  const router =  useRouter();
  
  

  useEffect(() => {
    async function fetchData() {
      setLoading(true);  
      try {
        const fetchedData = await retrivedata(userid);
        setData(fetchedData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch data.",
          variant: "destructive",
        });
      } 
    }
    fetchData();
  }, [userid]);
 
 
  useEffect(() =>{
    async function verificaiton(){
      try{
        const data = await verificationq(userid);
        setLoading(false)
        setVerficationq(data?.data.varified)
      }catch(e){
        console.log('little error')
      }
    }
    verificaiton()
  },[userid])

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Success",
        description: "Copied to clipboard",
        variant: "default",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet key="right">
      <SheetTrigger asChild>
        <EllipsisVertical className="h-6 cursor-pointer hover:text-slate-300 active:text-slate-100" />
      </SheetTrigger>
      <SheetContent className="bg-brand/brand-dark/85 " side="right">
        <SheetHeader>
          <SheetTitle asChild>
            <h3 className="text-gray-100 hover:text-white">Edit profile</h3>
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        
        
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loader">Loading...</span> 
          </div>
        ) : (
          <Editprofile verified={verfication} data={data?.data} />
        )}

        <SheetHeader>
          <SheetTitle className="text-gray-100 hover:text-white">Global Secret key</SheetTitle>
          <div className="flex w-fit flex-col gap-y-2">
            <Badge
              onClick={() => handleCopy(data?.data.secretkey)}
              className="w-auto cursor-copy"
            >
              {data?.data.secretkey}
            </Badge>
            <h3 className="text-xs text-red-500">*do not share it anyone </h3>
          </div>
        </SheetHeader>
        <SheetFooter className="absolute bottom-2 right-2">
        <Button 
        onClick={() => {
          signOut({callbackUrl : '/signin'});

        }} 
        className="bg-red-500 active:bg-red-400 hover:bg-red-600 ">
          Sign out
        </Button>
      </SheetFooter>
        
      </SheetContent>
      
      
    </Sheet>
  );
}
