"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/data';
import type { Article } from '@/lib/types';
import PageHeader from '@/components/shared/PageHeader';
import { CalendarDays, UserCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchedArticle = getArticleBySlug(slug);
      if (fetchedArticle) {
        setArticle(fetchedArticle);
      }
      setIsLoading(false);
    }
  }, [slug]);
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading article...</p></div>;
  }

  if (!article) {
    notFound(); // This will render the nearest not-found.tsx or Next.js default 404 page
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article className="py-8">
        <header className="mb-8 text-center">
          <p className="text-base text-primary font-semibold tracking-wide uppercase mb-2">{article.category}</p>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground leading-tight">
            {article.title}
          </h1>
          <div className="mt-4 flex justify-center items-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center">
              <UserCircle className="h-5 w-5 mr-1.5" />
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-1.5" />
              <span>Published on {new Date(article.date).toLocaleDateString()}</span>
            </div>
          </div>
        </header>

        {article.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg mb-8">
            <Image
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint={article.dataAiHint}
            />
          </div>
        )}
        
        <Separator className="my-8" />

        <div
          className="prose prose-lg sm:prose-xl max-w-none dark:prose-invert prose-headings:font-headline prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <Separator className="my-12" />

        <div className="text-center">
          <Link href="/blog">
            <Button variant="outline">Back to Blog</Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
