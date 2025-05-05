import Image from 'next/image'
import logo from '/public/auth/chatbot-logo.png'

export const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="animate-pulse flex flex-col items-center gap-2">
        {/* <Image 
          src={logo} 
          alt="Carter AI" 
          className="w-24 h-24 rounded-full shadow-md"
          priority
        /> */}
        <h2 className="text-xl font-medium text-muted-foreground mt-2">
          loading<span className="animate-[ellipsis_1.5s_infinite]">...</span>
        </h2>
      </div>
    </div>
  )
}

export default Loading
