import React from 'react'
import {Spinner} from '../spinner/index';

type LoaderProps = {
    loading:boolean;
    children:React.ReactNode;
}

const Loader:React.FC<LoaderProps> = ({
    loading, children
}) => {
  return loading ? (
    <div className='w-full py-5 flex justify-center'>
        <Spinner/>
    </div>
  )
  :
  (
    children
  )
}

export default Loader