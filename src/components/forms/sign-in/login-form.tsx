"use client";
import {USER_LOGIN_FORM} from '@/constants/forms'

import React from 'react'
import { useFormContext } from 'react-hook-form';
import FormGenerator from '../form-generator';

const LoginForm = () => {
    const {register,formState:{errors}} = useFormContext()
  return (
    <>
        <h2 className='text-gravel md:text-4xl font-bold'>Sign In</h2>
        <p className='text-irridium md:text-sm'>
          Enter yorur email and password
        </p>
        {
            USER_LOGIN_FORM.map((field)=>(
                <FormGenerator
                    key={field.id}
                    {...field}
                    register={register}
                    errors={errors}
                    name={field.name}

                />
            ))
        }
    </>
  )
}

export default LoginForm