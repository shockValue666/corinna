"use client";
import { onChatBotImageUpdate, onDeleteUserDomain, onUpdateDomain, onUpdatePassword, onUpdateWelcomeMessage } from "@/actions/settings";
import { useToast } from "@/components/ui/use-toast"
import { ChangePasswordProps, ChangePasswordSchema } from "@/schemas/auth.schema"
import { DomainSettingsSchema,DomainSettingsProps } from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { UploadClient } from "@uploadcare/upload-client"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { useForm } from "react-hook-form"

const upload = new UploadClient({
    publicKey:process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
})


export const useThemeMode = () => {
    const {setTheme, theme} = useTheme()
    return {
        setTheme,
        theme
    }
}

export const useChangePassword = () => {
    const {register, handleSubmit, formState:{errors}, reset } = useForm<ChangePasswordProps>({
        resolver:zodResolver(ChangePasswordSchema),
        mode:"onChange"
    })

    const {toast} = useToast();
    const [loading,setLoading] = useState<boolean>(false)


    const onChangePassword = handleSubmit(async (values:ChangePasswordProps)=>{
        try {
            setLoading(true)
            const updated = await onUpdatePassword(values.password)
            if(updated){
                reset();
                setLoading(false)
                toast({
                    title:"Success",
                    description:updated.message
                })
            }
        } catch (error) {
            console.log("error changing the password in the hook: ",error)
        }
    })

    return {
        register,
        errors,
        onChangePassword,
        loading
    }
}



export const useSettings = (domainId:string) => {
    const {register, handleSubmit, formState:{errors},reset} = useForm<DomainSettingsProps>({
        resolver:zodResolver(DomainSettingsSchema),
    })
    const router = useRouter()
    const {toast} = useToast()
    const [loading,setLoading] = useState<boolean>(false)
    const [deleting, setDeleting] = useState<boolean>(false);
    const onUpdateSettings = handleSubmit(async (values)=>{
        setLoading(true)
        if(values.domain){
            const domain = await onUpdateDomain(domainId, values.domain);
            if(domain){
                toast({
                    title:"Success",
                    description:domain.message
                })
            }
        }
        if(values.image[0]){
            const uploaded = await upload.uploadFile(values.image[0])
            const image = await onChatBotImageUpdate(domainId, uploaded.uuid)
            if(image){
                toast({
                    title:image.status == 200 ? "Success" : "Error",
                    description:image.message
                })
                setLoading(false)
            }
        }
        if(values.welcomeMessage){
            const updated = await onUpdateWelcomeMessage(values.welcomeMessage,domainId)
            if(updated){
                toast({
                    title:updated.status == 200 ? "Success" : "Error",
                    description:updated.message
                })
                setLoading(false)
            }
        }
        reset()
        router.refresh()
        setLoading(false)
    })

    const onDeleteDomain = async () => {
        setDeleting(true);
        const deleted = await onDeleteUserDomain(domainId)
        if(deleted){
            toast({
                title:"Success",
                description:deleted.message
            })
        }
        setDeleting(false);
        router.refresh();
    }
    return {
        register,
        onUpdateSettings,
        errors,
        loading,
        onDeleteDomain,
        deleting
    }

}