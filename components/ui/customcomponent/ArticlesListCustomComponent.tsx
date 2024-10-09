"use client";
import { BASE_URL } from "@/fetch/responsseserver";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { fetchArticles } from "@/fetch/responsseserver";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArticlesType } from "@/type";


const ArticlesListCustomComponent = () => {
  const [statusLoading, setStatusLoading] = useState(false);

  const [dataList, setDataList] = useState<ArticlesType[]>([]);
  useEffect(() => {
    const getDataArticles = async () => {
      const articles = await fetchArticles();
      if (articles.length > 1) {
        setDataList([...articles]);
        setStatusLoading(false);
      }
    };
    getDataArticles();
  }, []);

  
  return (
    <>

      {statusLoading === false && <p className="text-center">Загрузка...</p>}

      <div className="grid grid-cols-4 gap-1">
        {dataList.length != 0 && dataList.map((item) => {
          return <Card className="w-[310px]" key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.slug}</CardDescription>
              <Image
                src={item.image ? item.image : '/no_image.webp'}
                width={100}
                height={100}
                alt="Picture of the author"
              />
            </CardHeader>
            <CardContent>
              <p className="break-words">
                {item.content.slice(1, 50)}...
              </p>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  автор {item.author.username}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link href={`/onearticle/${item.id}`}>
                  Подробнее
                </Link>
              </Button>

            </CardFooter>
          </Card>
        })}
      </div>
    </>
  );

}
export default ArticlesListCustomComponent;
