import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { trackEvent } from 'fathom-client';
import Image from 'next/image';

import { FA_EVENTS } from '@/analytics';
import { Skeleton } from '@/app/components';
import { getQuestionInsights } from '@/queries/gnosis-ai';
import { FixedProductMarketMaker } from '@/queries/omen';

interface NewsProps {
  fixedProductMarketMaker: FixedProductMarketMaker;
}

interface NewsArticleProps {
  url: string;
  title: string;
}

type NewsDetails = {
  articlePublishTime?: string;
  ogImage?: string;
};

export const News = ({ fixedProductMarketMaker }: NewsProps) => {
  const { title, id } = fixedProductMarketMaker;

  const { data: questionInsights, isLoading } = useQuery({
    queryKey: ['getQuestionInsights', id],
    queryFn: () => getQuestionInsights(title || ''),
    enabled: Boolean(title),
  });

  const news = questionInsights?.results;

  if (isLoading)
    return Array.from({ length: 4 }).map((_, index) => (
      <LoadingNewsArticle key={Number(index)} />
    ));

  if (!news) return <div className="py-4 text-center">No news</div>;

  return news.map((newsArticle, index) => (
    <NewsArticle key={index} url={newsArticle.url} title={newsArticle.title} />
  ));
};

const NewsArticle = ({ url, title }: NewsArticleProps) => {
  const { data, isLoading } = useQuery<NewsDetails>({
    queryKey: ['getNewsDetails', url],
    queryFn: async () => {
      const metadataAPI = `https://metadata-api.fly.dev/api/url-metadata?url=${encodeURIComponent(url)}`;

      const response = await fetch(metadataAPI);

      if (!response.ok) {
        console.error(`Error fetching ${url}`);
        return;
      }
      return await response.json();
    },
    staleTime: Infinity,
    retry: 1,
  });

  const publishDate = data?.articlePublishTime ? parseISO(data.articlePublishTime) : null;

  return (
    <a
      className="flex cursor-pointer space-x-4 px-2 py-4 hover:rounded-6 hover:bg-surface-surface-1"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(FA_EVENTS.MARKETS.DETAILS.TABS.NEWS_ARTICLE)}
    >
      {data?.ogImage ? (
        <Image
          className="h-16 w-[88px] rounded-4"
          src={data.ogImage}
          height={64}
          width={88}
          alt="news image"
        />
      ) : isLoading ? (
        <Skeleton className="h-16 w-[88px] shrink-0 rounded-4" />
      ) : null}
      <div className="flex flex-col space-y-1">
        <p className="font-medium">{title}</p>
        {publishDate && publishDate.toString() !== 'Invalid Date' ? (
          <p className="text-sm text-text-low-em">
            {format(publishDate, 'd MMM y, HH:mm')}
          </p>
        ) : isLoading ? (
          <Skeleton className="h-4 w-24" />
        ) : null}
      </div>
    </a>
  );
};

const LoadingNewsArticle = () => {
  return (
    <div className="flex w-full cursor-pointer space-x-6 py-4">
      <Skeleton className="h-16 w-[88px] shrink-0 rounded-4" />
      <div className="flex w-full flex-col space-y-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
};
