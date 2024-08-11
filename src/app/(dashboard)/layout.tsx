import { onLoginUser } from '@/actions/auth'
import Sidebar from '@/components/sidebar';
import { ChatProvider } from '@/context/use-chat-context';
import React from 'react'

interface Props {
    children: React.ReactNode
}

const OwnerLayout:React.FC<Props> = async ({children}) => {
    const authenticated = await onLoginUser();
    console.log("authenticated: ",authenticated)
    if(!authenticated) {
      console.log("not authenticated")
      return(<>
      not here</>)
    }else{
      return (
        <ChatProvider>
          <div className='flex  h-screen w-full'>
            <Sidebar
              domains={authenticated.domain }
            />
            <div className='w-full h-screen flex flex-col py-3 pr-10 pl-20 md:px-10'>
              {children}  
            </div>
          </div>
        </ChatProvider>
      )
    };
  
}

export default OwnerLayout

// 6942999500 kalogeropoulos