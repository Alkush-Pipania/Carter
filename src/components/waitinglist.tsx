"use client"

import { useState } from "react"
import { Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { waitinglist } from "@/server/actions/links"
import Loader from "./global/Loader"
// import { waitinglist } from "@/server/actions/links"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const  [ isloading , setloading ] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setloading(true)
    const res = await waitinglist(email);
    console.log(res)
    setloading(false)
       setIsSubmitted(true)
    
    
   
  }

  return (
    <Card className="w-full max-w-md sm:mx-auto bg-brand/brand-dark border-none">
      <CardContent className="pt-6 ">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1 mb-2 text-sm border rounded-full bg-purple-500/10 border-purple-500/20 text-purple-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Join the Waitlist
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Get Early Access
            </h2>
            <p className="text-purple-200/80">
              Be among the first to experience the future of link management
            </p>
          </div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-purple-900/20 border-purple-500/20 text-white placeholder:text-purple-200/50"
                />
              </div>
              {isloading  ?(
                <div className="w-full h-12 flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white"> <Loader/></div>
               
              ):(
                <Button 
                type="submit" 
                className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white"
              >
                Join Waitlist
              </Button>
              )}
            </form>
          ) : (
            <div className="p-4 text-center rounded-lg bg-purple-500/10">
              <p className="text-purple-200">
                Thanks for joining! We'll notify you when Carter is ready.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

