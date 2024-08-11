"use server"

import { client } from "@/lib/prisma"
import { currentUser, redirectToSignIn } from "@clerk/nextjs"
import { onGetAllAccountDomains } from "../settings"

export const onCompleteUserRegistration = async (
    fullName:string,
    clerkId: string,
    type:string,
) => {
    try {
        const registered = await client.user.create({
            data: {
                fullName:fullName,
                clerkId,
                type,
                subscription: {
                    create:{},
                },
            },
            select: {
                fullName: true,
                clerkId: true,
                type: true,
            }
        })
        if(registered){
            return {status:200, user: registered}
        }else{
            console.log("couldn't register user")
        }
    } catch (error) {
        return {status: 400, error}
    }
}

export const onLoginUser = async () => {
    const user = await currentUser();
    console.log("current user: ",user)
    if(!user) redirectToSignIn();
    else{
        try {
            const authenticated = await client.user.findUnique({
                where:{
                    clerkId:user.id
                },
                select:{
                    fullName: true,
                    id:true,
                    type:true,
                }
            })
            if(authenticated){
                const domains = await onGetAllAccountDomains ();
                return {status:200, user:authenticated, domain:domains?.domains}
            }else{
                console.log("user not found in the database but found in clerk")
            }
        } catch (error) {
            console.log("error getting authentixcated user: ",error)
            return {status:400, user:null, domains:null}
        }
    }
}