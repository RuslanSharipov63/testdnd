"use client";
import Image from "next/image";
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

type ArticlesType = {
  id: number;
  author: {
    id: number;
    username: string;
    email: string;
  };
  title: string;
  slug: string;
  content: string;
  created: string;
  updated: string;
  image: string;
};

const ArticlesListCustomComponent = () => {
  const [statusLoading, setStatusLoading] = useState(false);

  const [dataList, setDataList] = useState<ArticlesType[]>([]);
  useEffect(() => {
    const getDataArticles = async () => {
      const articles = await fetchArticles();
      if (articles.length > 0) {
        setDataList([...articles]);
        setStatusLoading(false);
      }
    };
    getDataArticles();
  }, []);

  console.log(dataList);
  return (
    <>
    {statusLoading === false && <p className="text-center">Загрузка...</p>}
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              
            </div>
            <div className="flex flex-col space-y-1.5">
    
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    </>
  );
};

export default ArticlesListCustomComponent;
