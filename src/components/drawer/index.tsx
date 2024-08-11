import React from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerTrigger } from '../ui/drawer'


type Props = {
    onOpen:JSX.Element
    children:React.ReactNode
    title:string
    description:string
}

const AppDrawer:React.FC<Props> = ({
    onOpen,
    children,
    title,
    description
}) => {
  return (
    <Drawer>
        <DrawerTrigger>
            {onOpen}
        </DrawerTrigger>
        <DrawerContent>
            <div className='container flex flex-col items-center gap-2 pb-10'>
              <DrawerDescription>
                {children}
              </DrawerDescription>
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default AppDrawer