import { onGetCurrentDomainInfo } from '@/actions/settings'
import DomainSettings from '@/components/forms/settings/form'
import InfoBar from '@/components/infobar/page'
import { redirect } from 'next/navigation'
import React from 'react'


type Props = {
    params:{domain:string}
}

const DomainSettingsPage:React.FC<Props> = async ({
    params
}) => {
    const domain = await onGetCurrentDomainInfo(params.domain)
    if(!domain) redirect("/settings")
  return (
    <>
      <InfoBar/>
      <div className='overflow-y-auto w-full chat-window flex-1 h-0'>
  
        <DomainSettings 
          id={domain.domains[0]?.id}
          plan={domain.subscription?.plan!}
          chatBot={domain.domains[0]?.chatBot!}
          name={domain.domains[0].name}

        />
      </div>
    </>
  )
}

export default DomainSettingsPage