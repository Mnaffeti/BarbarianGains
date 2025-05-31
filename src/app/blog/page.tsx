import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/shared/PageHeader';
import { mockArticles } from '@/lib/data';
import type { Article } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCircle } from 'lucide-react';

export default function BlogPage() {
  return (
    <div>
      <PageHeader
        title="Swiss Gains Blog"
        subtitle="Expert insights on supplements, nutrition, and achieving your fitness goals."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockArticles.map((article: Article) => (
          <Card key={article.slug} className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <Link href={`/blog/${article.slug}`} className="block aspect-video relative">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-300"
                  data-ai-hint={article.dataAiHint}
                />
              </Link>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-sm text-primary font-medium mb-1">{article.category}</p>
              <CardTitle className="text-xl font-headline mb-3">
                <Link href={`/blog/${article.slug}`} className="hover:text-primary transition-colors">
                  {article.title}
                </Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center text-xs text-muted-foreground space-x-4">
                <div className="flex items-center">
                  <UserCircle className="h-4 w-4 mr-1" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t">
              <Link href={`/blog/${article.slug}`} className="w-full">
                <Button variant="outline" className="w-full">Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
