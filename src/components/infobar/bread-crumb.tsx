"use client";
import React from 'react'

type Props = {

}

const BreadcrumbCustom = ({}:Props) => {
    //WIP: Set up use side bar hook for real time-chats and chat bot stuff 
    //WIP: set up the description and the switch component 
  return (
    <div className='flex flex-col'>
        <div className='flex gap-5 items-center'>
            <h2 className='text-3xl font-bold capitalize'>Title</h2>
        </div>

        <p className='text-gray-500 text-sm'>
            {
                // page == "settings" 
                // ? "Manage your account settingsw, preferenes and integrations"
                // : page=="dashboard"
                // ? "A detailed overfiew of your metrics, usage, customers and more"
                // : page =="appointment"
                // ? "View and edit all your appointments"
                // : page == "email-marketing"
                // ? "Send bulk emails to your customers"
                // : page =="integration" 
                // ? "Connect third-party applications into Corinna-AI"
                // :
                "Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to do"

            }
        </p>
    </div>
  )
}

export default BreadcrumbCustom