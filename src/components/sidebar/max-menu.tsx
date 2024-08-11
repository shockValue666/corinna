import { SIDE_BAR_MENU } from '@/constants/menu'
import { LogOut, Menu, MonitorSmartphone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import DomainMenu from './domain-menu'
import MenuItem from './menu-item'

interface Props {
    domain: |{
        name: string,
        id:string,
        icon:string
    }[]
    |null
    |undefined,
    current:string,
    onExpand: () => void,
    onSignOut:()=>Promise<void>
}
const MaxMenu:React.FC<Props> = ({
    domain,
    current,
    onExpand,
    onSignOut
}) => {

    console.log("max menu here")
  return (
    <>
    <div className='py-3 px-4 flex flex-col h-full'>
        <div className='flex justify-between items-center'>
            <Image
                src="/images/logo.png"
                alt="LOGO"
                sizes="100vw"
                className='animate-fade-in opacity-0 delay-300 fill-mode-forwards'
                style={{
                    width:"50%",
                    height:"auto"
                }}
                width={0}
                height={0}

            />
            <Menu
                className='cursor-pointer animate-fade-in opacity-0 delay-300 fill-mode-forwards'
                onClick={onExpand}
            />
        </div>
        <div className='animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10'>
        <div className='flex flex-col'>
            <p className='text-xs text-gray-500 mb-3'>
                MENU
            </p>    
            {SIDE_BAR_MENU.map((menu,key)=>(
                <MenuItem
                    size="max"
                    {...menu}
                    key={key}
                    current={current}
                />
            ))}
            <DomainMenu domains={domain}/>
        </div>
        <div className='flex flex-col'>
            <p className='text-xs text-gray-500 mb-3'>OPTIONS</p>
            <MenuItem
                size="max"
                label="Sign out"
                onSignOut={onSignOut}
                icon={<LogOut/>}
            />
            <MenuItem
                size='max'
                label="mobile app"
                icon={<MonitorSmartphone/>}
            />
        </div>
    </div>
    </div>
    </>
  )
}

export default MaxMenu