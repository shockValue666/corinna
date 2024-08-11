"use client";
import useSidebar from '@/hooks/sidebar/use-side-bar-hook';
import { cn } from '@/lib/utils';
import React, { useEffect } from 'react'
import MaxMenu from './max-menu';
import { MinMenu } from './min-menu';


type Props = {
    domains: 
        | {
            id:string,
            name:string,
            icon:string
        }[]
        | null 
        | undefined
}
const Sidebar:React.FC<Props> = ({
    domains
}) => {
    const {expand, onExpand, page, onSignOut} = useSidebar()
  return (
    <div className={cn("bg-cream h-full w-[60px] fill-mode-forwards fixed md:relative",
      expand == undefined && "",
      expand == true ? 
      "animate-open-sidebar" : 
      expand == false && 'animate-close-sidebar'
    )}>

  {
    expand ? (<>
    <MaxMenu 
      domain={domains}
      current={page!}
      onExpand={onExpand}
      onSignOut={onSignOut}
    />
    </>) 
    : 
    (<>
    <MinMenu  
      domains={domains}
      current={page!}
      onShrink={onExpand}
      onSignOut={onSignOut}
    />
    </>)
  }
    </div>
  )
}

export default Sidebar