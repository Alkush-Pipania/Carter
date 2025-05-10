"use client"
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/actions/auth'
import React from 'react'

const page = () => {
  return (
    <div><Button
    onClick={()=>{
      localStorage.clear()
      logout()}}
    >sign out</Button></div>
  )
}

export default page