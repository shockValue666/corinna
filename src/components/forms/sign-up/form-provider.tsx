"use client"
import Loader from '@/components/loader'
import { AuthContextProvider } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import React from 'react'
import { FormProvider } from 'react-hook-form'


type SignUpFormProviderProps = {
    children:React.ReactNode
}

const SignUpFormProvider:React.FC<SignUpFormProviderProps> = ({children}) => {
  const {methods, onHandleSubmit, loading} = useSignUpForm()
  //the methods is the return of the useForm hook from react-hook-form
  return (
    <AuthContextProvider>
        <FormProvider {...methods}>
          <form onSubmit={onHandleSubmit} className="h-full">
            <div className='flex flex-col justify-between gap-3 h-full'>
              <Loader loading={loading}>
                {children}
              </Loader>
            </div>
          </form>
            {/* {children} */}
        </FormProvider>
    </AuthContextProvider>
  )
}

export default SignUpFormProvider