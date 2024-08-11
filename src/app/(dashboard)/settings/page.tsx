"use server";
import InfoBar from '@/components/infobar/page'
import BillingSettings from '@/components/settings/billing-settings'
import ChangePassword from '@/components/settings/change-password';
import DarkModeToggle from '@/components/settings/dark-mode-toggle';
import React from 'react'

const Page = () => {
  console.log("some bullshit")
  return (
    <>
      <InfoBar/>
      <div className='overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10'>
        {/* <BillingSettings/> */}
        <DarkModeToggle/>
        <ChangePassword/>
      </div>
    </>
  )
}

export default Page