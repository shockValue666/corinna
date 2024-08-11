"use server"
import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs"

export const onGetSubscriptionPlan = async () => {
    try {
        const user = await currentUser();
        if(!user) return;
        const plan = await client.user.findUnique({
            where:{
                clerkId:user.id
            },
            select:{
                subscription: {
                    select:{
                        plan:true,

                    }
                }
            }
        })
        if(plan){
            return plan.subscription?.plan
        }
    } catch (error) {
        console.log("error fetching the subscription plan for user: ",error)
    }
}

export const onGetAllAccountDomains = async () => {
    const user = await currentUser();
    if(!user) return;
    try {
        const domains = await client.user.findUnique({
            where: {
                clerkId:user.id
            },
            select:{
                id:true,
                domains:{
                    select:{
                        name:true,
                        icon:true,
                        id:true,
                        customer:{
                            select:{
                                chatRoom:{
                                    select:{
                                        id:true,
                                        live:true,
                                    }
                                }
                            }
                        }

                    }
                }
            }
        })
        return {...domains}
    } catch (error) {
        console.log("error getting all account domains: ",error)
    }
}

export const onIntegrateDomain = async (domain:string, icon:string) => {
    const user = await currentUser();
    if(!user) return;
    try {
        const subscription = await client.user.findUnique({
            where: {
                clerkId:user.id
            },
            select:{
                _count:{
                    select:{
                        domains:true
                    }
                },
                subscription:{
                    select:{
                        plan:true
                    }
                }
            }
        })

        const domainExists = await client.user.findFirst({
            where: {
                clerkId:user.id,
                domains: {
                    some: {
                        name:domain
                    }
                }
            }
        })
        if(!domainExists){
            if(
                (subscription?.subscription?.plan == "STANDARD" && subscription._count.domains < 1)
                ||
                (subscription?.subscription?.plan == "PRO" && subscription._count.domains < 5)
                || 
                (subscription?.subscription?.plan == "ULTIMATE" && subscription._count.domains < 10)
            ){
                const newDomain = await client.user.update({
                    where: {
                        clerkId:user.id
                    },
                    data:{
                        domains: {
                            create:{
                                name:domain,
                                icon,
                                chatBot:{
                                    create:{
                                        welcomeMessage: "Hey there, have a question? Text us here."
                                    }
                                }
                            }
                        }
                    }
                })
                if(newDomain){
                    return {status:200, message: "Domain added successfully"}
                }
            }
            return {status:400, message: "You have reached the maximum number of domains, upgrade to proceed"}
        }
        return {status:400, message: "Domain already exists"}
    } catch (error) {
        console.log("error integrating domain: ",error)
    }
}



export const onUpdatePassword = async (password:string) => {
    try {
        const user = await currentUser();
        if(!user) return null;
        const update = await clerkClient.users.updateUser(user.id,{password})
        if(update){
            return {status:200, message:"Password updated"}
        }
    } catch (error) {
        console.log("error updating the password: ",error)
    }
}

export const onGetCurrentDomainInfo = async (domain:string) => {
    const user = await currentUser();
    if(!user) return;
    try {
        const userDomain = await client.user.findUnique({
            where:{
                clerkId:user.id
            },
            select:{
                subscription:{
                    select:{
                        plan:true
                    }
                },
                domains:{
                    where: {
                        name:{
                            contains:domain
                        },
                    },
                    select: {
                        id:true,
                        name:true,
                        icon:true,
                        userId:true,
                        chatBot:{
                            select:{
                                id:true,
                                welcomeMessage:true,
                                icon:true
                            }
                        }
                    }
                }
            }
        })
        if(userDomain){
            return userDomain
        }
    } catch (error) {
        console.log("error getting current domain info: ",error)
    }
}

export const onUpdateDomain = async (id:string, name:string) => {
    const domainExists = await client.domain.findFirst({
        where: {
            name:{
                contains:name
            }
        },
    })
    if(domainExists){
        const domain = await client.domain.update({
            where:{
                id,
            },
            data:{
                name
            },
        })
        if(domain){
            return {
                status:200,
                message:"Domain updated"
            }
        }
        return {
            status:400,
            message: "something went wrong updating the domain"
        }
    }
    return {
        status:400,
        message: "Domain already exists"
    }

}

export const onChatBotImageUpdate = async (id:string, icon:string) => {
    const user = await currentUser();
    if(!user) return;
    try {
        const domain = await client.domain.update({
            where:{
                id,
            },
            data:{
                chatBot:{
                    update:{
                        data:{
                            icon
                        }
                    }
                }
            }
        })
        if(domain){
            return {
                status:200,
                message:"Domain updated"
            }
        }
        return {
            status:400,
            message: "something went wrong updating the domain"
        }
    } catch (error) {
        console.log("error updating chat bot image: ",error)
    }
}

export const onUpdateWelcomeMessage = async (message:string, domainId:string) => {

    try {
        const update = await client.domain.update({
            where:{
                id:domainId
            },
            data:{
                chatBot:{
                    update:{
                        data:{
                            welcomeMessage: message
                        }
                    }
                }
            }
        })
        if(update){
            return {
                status:200,
                message:"Welcome message updated"
            }
        }
        return {
            status:400,
            message: "something went wrong updating the welcome message"
        }
    } catch (error) {
        console.log("something went wrong while updating welcome message: ",error)
    }
}

export const onDeleteUserDomain = async (domainId:string)=>{
    const user = await currentUser();
    if(!user) return;
    //verify that the domain belongs to the user
    try{
        const validUser = await client.user.findUnique({
            where:{
                clerkId:user.id
            },
            select:{
                id:true,
            }
        })
        if(validUser){
            const deletedDomain = await client.domain.delete({
                where:{
                    userId:validUser.id,
                    id:domainId
                },
                select:{
                    name:true
                }
            })
            if(deletedDomain){
                return {
                    status:200,
                    message:`Domain ${deletedDomain.name} deleted successfully`
                }
            }
            return {
                status:400,
                message:"Something went wrong while deleting the domain"
            }
        }
        return {
            status:400,
            message:"Something went wrong while deleting the domain"
        }
        
    }catch(err){
        console.log("error deleting user domain: ",err)
        return {
            status:400,
            message:"Something went wrong while deleting the domain"
        }
    }
}