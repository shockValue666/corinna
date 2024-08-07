"use client";
import { onGetConversationMode, onToggleRealtime } from '@/actions/conversation';
import { useToast } from '@/components/ui/use-toast';
import { useChatContext } from '@/context/use-chat-context';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const useSidebar = () => {
    const [expand, setExpand] = useState<boolean | undefined>(undefined)
    const router = useRouter();
    const pathName = usePathname();
    const {toast} = useToast();
    const [realtime,setRealtime] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);


    const {chatRoom} = useChatContext()


    const onActivateRealTime = async (e:any) => {
        try {
            const realtime = await onToggleRealtime(chatRoom!,e.target.ariaChecked == 'true'? false : true)
            if(realtime?.chatRoom){
                setRealtime(realtime.chatRoom.live );
                toast({
                    title:"Success",
                    description:realtime.message
                })
            }
        }catch(err){
            console.log("error activating realtime",err)
        }
    }
    const onGetCurrentMode = async () => {
        setLoading(true)
        const mode = await onGetConversationMode(chatRoom!);
        if(mode){
            setRealtime(mode.live);
            setLoading(false);
        }
    }
  return (
    <div>UseSideBar</div>
  )
}

export default useSidebar