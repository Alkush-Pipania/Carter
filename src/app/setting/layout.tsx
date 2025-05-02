"use client"

import React from 'react'


const HomePageLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <main >
      <div>
        {children}
      </div>
    </main>
  )
}

export default HomePageLayout