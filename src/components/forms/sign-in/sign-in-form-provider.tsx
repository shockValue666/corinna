"use client";
import Loader from '@/components/loader';
import { AuthContextProvider } from '@/context/use-auth-context';
import { useSignInForm } from '@/hooks/sign-in/use-sign-in';
import React from 'react'
import { FormProvider } from 'react-hook-form';


interface Props {
    children: React.ReactNode;
}

const SignInFormProvider:React.FC<Props> = ({
    children
}) => {
    const {methods, onHandleSubmit, loading} = useSignInForm()
  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form action="" onSubmit={onHandleSubmit}>
          <div>
            <Loader loading={loading}>
              {children}
            </Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  )
}

export default SignInFormProvider