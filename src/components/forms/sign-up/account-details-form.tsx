import { USER_REGISTRATION_FORM } from '@/constants/forms'
import React from 'react'
import { FieldErrors, FieldValue, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'

type Props = {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

const AccountDetailsForm:React.FC<Props> = ({
  register,errors
}) => {
  return (
    <>
      <h2 className='text-gravel md:text-4xl font-bold'>
        Account Details
      </h2>
      <p className='text-iridium md:text-sm'>
        Enter yorur email and password
      </p>
      {USER_REGISTRATION_FORM.map((field)=> (
        <FormGenerator
          key={field.id}
          {...field}
          register={register}
          errors={errors}
          name={field.name}
        />
      ))}
    </>
  )
}

export default AccountDetailsForm