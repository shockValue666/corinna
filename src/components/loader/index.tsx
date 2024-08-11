import React from 'react'
import {Spinner} from '../spinner/index';
import { cn } from '@/lib/utils';

type LoaderProps = {
    loading:boolean;
    children:React.ReactNode;
    className?:string;
    noPadding?:boolean
}

const Loader:React.FC<LoaderProps> = ({
    loading, children, className, noPadding
}) => {
  return loading ? (
    <div className={cn(className || 'w-full py-5 flex justify-center')}>
        <Spinner noPadding={noPadding}/>
    </div>
  )
  :
  (
    children
  )
}

export default Loader