"use client";
import { Separator } from '@/components/ui/separator';
import { useSettings } from '@/hooks/settings/use-settings';
import React from 'react'
import DomainUpdate from './domain-update';
import CodeSnippet from './code-snippet';
import PremiumBadge from '@/icons/premium-badge'; 
import EditChatBotIcon from './edit-chatbot-icon';
import dynamic from 'next/dynamic';

const WelcomeMessage = dynamic(()=>import('./welcome-message'),{
    ssr:false
})
type Props = {
    id:string,
    name:string,
    plan: "STANDARD" | "PRO" | "ULTIMATE"
    chatBot: {
        id:string,
        icon:string | null,
        welcomeMessage:string | null
    } | null
}

const SettingsForm:React.FC<Props> = ({
    id,
    name,
    plan,
    chatBot
}) => {
    const {
        register,
        onUpdateSettings,
        errors,
        onDeleteDomain,
        deleting,
        loading
    } = useSettings(id);
  return (
    <form onSubmit={onUpdateSettings} className='flex flex-col gap-8 pb-10'>
        <div className='flex flex-col gap-3'>
            <h2 className='font-bold text-2xl'>
                Domain Settings
            </h2>
            <Separator orientation='horizontal'/>
            <DomainUpdate
                name={name}
                register={register}
                errors={errors}
            />
            <CodeSnippet id={id}/>
        </div>
        {/* {plan === "PRO" || plan==="ULTIMATE" } */}
        <div className='flex flex-col gap-3 mt-5'>
            <div className='flex gap-4 items-center'>
                <h2 className='font-bold text-2xl'>
                    Chatbot settings
                </h2>
                <div className='flex gap-1 br-cream rounded-full px-3 py-1 text-xs items-center font-bold'>
                    <PremiumBadge
                        // className="text-orange"
                        // size={14}
                    />
                    Premium
                </div>
            </div>
            <Separator orientation='horizontal'/>
            <div className='grid grid-cols-2'>
                <div className='col-span-1 flex flex-col gap-5'>
                    <EditChatBotIcon
                        chatBot={chatBot}
                        register={register}
                        errors={errors}
                    />
                    <WelcomeMessage
                        message={chatBot?.welcomeMessage}
                        register={register}
                        errors={errors}
                    />
                </div>
            </div>
        </div>
    </form>
  )
}

export default SettingsForm 