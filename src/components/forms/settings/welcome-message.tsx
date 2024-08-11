import Section from '@/components/section-label'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'

interface Props {
    register:UseFormRegister<FieldValues>
    errors:FieldErrors<FieldValues>
    message:string | null | undefined

}

const WelcomeMessage:React.FC<Props> = ({
    register,
    errors,
    message
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <Section
        label="Welcome Message"
        message="Customize your welcome message"
      />
      <div className='lg:w-[500px]'>
        <FormGenerator
          placeholder={message || ""}
          register={register}
          errors={errors}
          name="welcomeMessage"
          type="text"
          inputType='input'
          id="message"
          lines={2}
        />
      </div>
    </div>
  )
}

export default WelcomeMessage