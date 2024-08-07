import { onGetBlogPosts } from "@/actions/landing";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/constants/landing-page";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser'
import { getMonthName } from "@/lib/utils";

export default async function Home() {
  //WIP challenge to setup billing card

  //get posts from wordpress
  const posts: | {
    id:string,
    title:string,
    image:string,
    content:string,
    createdAt:Date
  }[] | undefined = await onGetBlogPosts(); 

  return (
    <main className="">
      <Navbar/>
      {/* hero */}
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4">
          <span className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm">
            An AI powered sales assistant chatbot
          </span>
          <Image
            src="/images/corinna-ai-logo.png"
            width={500}
            height={100}
            alt="logo"
            className="max-w-lg object-contain"
          />
          <p className="text-center max-w-[500px]">
            Your AI powered sales assistnat! Embed Corinna AI into any website
            with just a snippet of code!
          </p>
          <Button className="bg-orange font-bold text-white px-4" >
            Start For Free
          </Button>
          <Image
            src="/images/iphonecorinna.png"
            width={400}
            height={100}
            alt="logo"
            className="max-w-lg object-contain"
          />
        </div>  
      </section>
      {/* pricing section */}
      <section className="flex justify-center items-center flex-col gap-4 mt-10">
        <h2 className="text-4xl text-center">
          Choose what fits you right
        </h2>
        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If {" you're"} not <br />
          ready to commit you can get started for free
        </p>
      </section>
    {/* pricing cards */}
      <div className="flex justify-center gap-4 flex-wrap mt-6">
        {pricingCards.map((card)=>(
          <Card key={card.title}
            className={clsx("w-[300px] flex flex-col justify-between",{
              'border-2 border-primary':card.title === "Unlimited"
            })}
          >
            <CardHeader>
              <CardTitle className="text-orange">
                {card.title}
              </CardTitle>
              <CardDescription>
                {pricingCards.find(c=>c.title===card.title)?.description}
                {/* {card.description} */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">{card.price}</span>
              <span className="text-muted-foreground">
                <span>/month</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {pricingCards
                  .find(c=>c.title===card.title)?.features
                    .map((feature)=>(
                      <div className="flex gap-2" key={feature}>
                        <Check/>
                        <p>{feature}</p>
                      </div>
                    ))
                }
              </div>
              <Link
                href={`/dashboard?plan=${card.title}`}
                className="bg-[#f3d299] border-orange border-2 p-2 w-full text-center font-bold rounded-md"
              > 
              Get Started
              </Link>
            </CardFooter>
            
          </Card>
        ))}
      </div>

      {/* blog section */}
      <section className="flex justify-center items-center flex-col gap-4 mt-28">
        <h2 className="text-4xl text-center">
          News Room
        </h2>
        <p className="text-muted-foreground text-center">
          Explore our insights on AI, technology, and optimizing your business.
        </p>
      </section>
      <section className="md:grid-cols-3 grid-cols-1 grid gap-5 container">
        {posts && (posts.map((post)=>(
          <Link href={`/blogs/${post.id}`} key={post.id} >
            <Card className="flex flex-col gap-2 rounded-xl overflow-hidden h-full hover:bg-gray-100">
              <div className="relative w-full aspect-video">
                <Image src={`${process.env.CLOUDWAYS_UPLOADS_URL}${post.image}`} alt="post featured image" fill />
              </div>

              <div className="py-5 px-10 flex flex-col gap-5">
                <CardDescription>
                  {getMonthName(post.createdAt.getMonth())}{' '}
                  {post.createdAt.getDate()} {post.createdAt.getFullYear()}
                </CardDescription>
                <CardTitle>
                  {post.title}
                </CardTitle>
                {parse(post.content.slice(4,100))}...
              </div>
            </Card> 
          </Link>
        )))}
      </section>
    </main>
  );
}
