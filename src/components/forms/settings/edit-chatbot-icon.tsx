import Section from '@/components/section-label'
import UploadButton from '@/components/upload-button'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import Image from 'next/image'
import { BotIcon } from '@/icons/bot-icon'

interface Props {
    chatBot:{
      id:string,
      welcomeMessage:string | null,
      icon:string | null
    } | null,
    errors:FieldErrors<FieldValues>,
    register:UseFormRegister<FieldValues>
}

const EditChatBotIcon:React.FC<Props> = ({
  chatBot,errors, register
}) => {
  return (  
    <div className='py-5 flex flex-col gap-5 items-start'>
      <Section
        label="Chat Bot Icon"
        message='Change the icon for the chatbot'
      />
      <UploadButton
        label='Edit Image'
        register={register}
        errors={errors}
      />
      {chatBot?.icon ? (
        <div className='rounded-full overflow-hidden'>
          <Image
            src={`https://ucarecdn.com/${chatBot.icon}/`}
            alt="bot"
            width={80}
            height={80}
          />
        </div>
      ): (
        <div className='rounded-full cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-grandis'>
          <BotIcon/>
        </div>
      ) }
    </div>
  )
}

export default EditChatBotIcon