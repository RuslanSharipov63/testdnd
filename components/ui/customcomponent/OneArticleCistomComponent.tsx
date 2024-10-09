"use client"
import { FC, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { fetchOneArticle } from '@/fetch/responsseserver';
import { ArticlesType } from '@/type';
import Link from 'next/link';

const OneArticleCustomComponent = () => {
    const pathname = usePathname();
    const id = pathname.split('/')

    const [oneArticle, setOneArticle] = useState<ArticlesType>({});

    useEffect(() => {
        const getOneArticle = async () => {
            const article = await fetchOneArticle(id[id.length - 1])
            console.log(article)
            if (article.length > 0) {
                setOneArticle({...article})
            }
            
        }

        getOneArticle();
    }, [])


    return (

        /*  <Card className="w-[350px]">

            <CardHeader>
                <CardTitle>{oneArticle.title}</CardTitle>
                <CardDescription>{oneArticle.slug}</CardDescription>
                <Image
                    src={oneArticle.image ? oneArticle.image : '/no_image.webp'}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                />
            </CardHeader>
            <CardContent>
                <p className="break-words">
                    {oneArticle.content}
                </p>
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        автор {oneArticle.author.username}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">
                    <Link href="/">
                        Подробнее
                    </Link>
                </Button>

            </CardFooter>
        </Card>  */
        <></>
    )
}

export default OneArticleCustomComponent;