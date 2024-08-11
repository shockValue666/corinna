import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'


type DomainUpdateProps = {
    name:string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>
}


const DomainUpdate = ({name,register,errors}:DomainUpdateProps) => {
  return (
    <div className='flex gap-2 pt-5 items-end w-[400px]'>
        <FormGenerator
            name={name}
            label="Domian name"
            register={register}
            errors={errors}
            type="text"
            inputType='input'
            placeholder={name}
            id="222"
            />
    </div>
  )
}

export default DomainUpdate