import { onLoginUser } from '@/actions/auth'
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
      return(<></>)
    }else{
      return (
        <ChatProvider>
          <div className='flex h-screen w-full'>

          </div>
          {children}
        </ChatProvider>
      )
    };
  
}

export default OwnerLayout

// 6942999500 kalogeropoulos