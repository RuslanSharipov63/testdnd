export type ArticlesType = {
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
