"use client";
import { Button } from '@/components/ui/button';
import { useAuthContextHook } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form';

interface Props {

}

const ButtonHandler:React.FC<Props> = () => {

    const {currentStep, setCurrentStep} = useAuthContextHook();
    const {formState, getFieldState,getValues} = useFormContext();
    const {onGenerateOTP} = useSignUpForm();

    const {isDirty:isNameDirty} = getFieldState("fullname",formState);
    const {isDirty:isEmail} = getFieldState("email",formState);
    const {isDirty:isPassword} = getFieldState("password",formState);


    useEffect(()=>{
      console.log("changed states",isNameDirty,isEmail,isPassword)
    },[isNameDirty,isEmail,isPassword])


    if(currentStep === 3) {
      return (
        <div className='w-full flex flex-col gap-3 items-center'>
          <Button 
          type="submit" 
          className='w-full'
          >
              Create an Account
          </Button>
          <p>
            Already have an account? {' '}
            <Link
              href={'/auth/sign-in'}
              className='font-bold'
            >
              Sign In
            </Link>
          </p>
        </div>
      )
    }

    if(currentStep===2){
      return (
        <div className='w-full flex flex-col gap-3 items-center'>
          <Button
            type="submit"
            className='w-full'
            {
              ...(isNameDirty && isEmail && isPassword && {
                onClick: () => onGenerateOTP(getValues('email'),getValues('password'),setCurrentStep)
              })
            }
          >
            Continue
          </Button>
          <p>
            Already have an account? {' '}
            <Link
              href={'/auth/sign-in'}
              className='font-bold'
            >
              Sign In
            </Link>
          </p>
        </div>
      )
    }

  return (
    <div className='w-full flex flex-col gap-3 items-center'>
      <Button 
      type="submit" 
      className='w-full'
      onClick={()=> setCurrentStep((prev:number)=>prev+1)}
      >
          Continue
      </Button>
      <p>
        Already have an account? {' '}
        <Link
          href={'/auth/sign-in'}
          className='font-bold'
        >
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default ButtonHandler