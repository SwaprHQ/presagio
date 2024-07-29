import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';

interface NewsProps {
  id: string;
}

interface NewsArticleProps {
  url: string;
  title: string;
}

type NewsDetails = {
  articlePublishTime?: string;
  ogImage?: string;
};

type MarketInsights = {
  results: {
    title: string;
    url: string;
  }[];
};

export const News = ({ id }: NewsProps) => {
  const { data: marketInsights, isLoading } = useQuery<MarketInsights>({
    queryKey: ['getMarketInsights', id],
    queryFn: async () => {
      const result = await fetch(
        `https://labs-api.ai.gnosisdev.com/market-insights/?market_id=${id}`
      );

      return await result.json();
    },
  });

  const news = marketInsights?.results;

  if (isLoading)
    return Array.from({ length: 4 }).map((_, index) => (
      <NewsSkeleton key={Number(index)} />
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
        console.log(`Error fetching ${url}`);
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
      className="flex cursor-pointer space-x-4 py-4"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
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
        <div className="h-16 w-[88px] flex-shrink-0 animate-pulse rounded-4 bg-outline-low-em" />
      ) : null}
      <div className="flex flex-col space-y-1">
        <p className="font-semibold">{title}</p>
        {publishDate && publishDate.toString() !== 'Invalid Date' ? (
          <p className="text-sm text-text-low-em">
            {format(publishDate, 'd MMM y, HH:mm')}
          </p>
        ) : isLoading ? (
          <div className="h-4 w-24 animate-pulse rounded-8 bg-outline-low-em" />
        ) : null}
      </div>
    </a>
  );
};

const NewsSkeleton = () => {
  return (
    <div className="flex w-full cursor-pointer space-x-6 py-4">
      <div className="h-16 w-[88px] flex-shrink-0 animate-pulse rounded-4 bg-outline-low-em" />
      <div className="flex w-full flex-col space-y-2">
        <div className="h-9 w-full animate-pulse rounded-8 bg-outline-low-em" />
        <div className="h-4 w-24 animate-pulse rounded-8 bg-outline-low-em" />
      </div>
    </div>
  );
};
