'use client';

import { useQueries, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FixedProductMarketMaker, getMarket, getMarkets } from '@/queries/omen';
import {
  CardMarket,
  LoadingCardMarket,
  OutcomeBar,
  Skeleton,
  TokenLogo,
} from '@/app/components';
import {
  Button,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleGroup,
  ToggleGroupOption,
} from '@swapr/ui';
import { useState } from 'react';
import { useShowClientUI, useDebounce } from '@/hooks';
import { cx } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import {
  CreatorFilter,
  OrderFilter,
  StateFilter,
  TokenFilter,
  creatorFilters,
  orderFilters,
  stateFilters,
  tokenFilters,
} from './filters';
import { isAddress } from 'viem';
import Image from 'next/image';
import { getOpenMarkets } from '@/queries/dune';
import { Categories } from '@/constants';
import { formatEtherWithFixedDecimals, remainingTime } from '@/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselSelector,
} from './components/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import { highlightedMarketsList } from '@/market-highlight.config';
import defaultHighlightImage from '@/public/assets/highlights/default.png';

const DEFAULT_CATEGORIES = Object.values(Categories);
const DEFAULT_CREATOR_OPTION = creatorFilters[0];
const DEFAULT_ORDER_OPTION = orderFilters[0];
const DEFAULT_STATE_OPTION = stateFilters[0];
const DEFAULT_TOKEN_OPTION = tokenFilters[0];
const ITEMS_PER_PAGE = 12;
const SEARCH_DEBOUNCE_DELAY = 600;

type CategoryOptions = Categories | '';
type DuneCategory = { Category: string };

const rankCategoriesByMarketCount = (data: any) => {
  if (!data) return [];

  const marketsGroupedByCategory = Object.groupBy(
    data,
    (market: DuneCategory) => market.Category
  );

  if (!marketsGroupedByCategory) return [];

  const countByCategory = Object.values(Categories).map(category => {
    const count = marketsGroupedByCategory[category]?.length || 0;
    return { [category]: count };
  });

  return countByCategory.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
};

export default function HomePage() {
  const router = useRouter();
  const showClientUI = useShowClientUI();
  const [isCreatorFilterPopoverOpen, setCreatorFilterPopoverOpen] = useState(false);
  const [isOrderFilterPopoverOpen, setOrderFilterPopoverOpen] = useState(false);
  const [isStateFilterPopoverOpen, setStateFilterPopoverOpen] = useState(false);
  const [isTokenFilterPopoverOpen, setTokenFilterPopoverOpen] = useState(false);

  const searchParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams('/');

  const [category, setCategory] = useState(searchParams.get('c') || '');

  const [search, setSearch] = useState(searchParams.get('s') || '');
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

  const initialFilter = () => {
    const filterValueFromSearchParams = searchParams.get('f');
    if (!filterValueFromSearchParams) return DEFAULT_ORDER_OPTION;

    return (
      orderFilters.find(option => option.key === filterValueFromSearchParams) ||
      DEFAULT_ORDER_OPTION
    );
  };

  const [selectedOrderOption, setSelectedOrderOption] = useState(initialFilter());

  const initialStateFilter = () => {
    const filterValueFromSearchParams = searchParams.get('sf');
    if (!filterValueFromSearchParams) return DEFAULT_STATE_OPTION;

    return (
      stateFilters.find(option => option.key === filterValueFromSearchParams) ||
      DEFAULT_STATE_OPTION
    );
  };

  const [selectedStateOption, setSelectedStateOption] = useState(initialStateFilter());

  const initialCreatorFilter = () => {
    const filterValueFromSearchParams = searchParams.get('cf');
    if (!filterValueFromSearchParams) return DEFAULT_CREATOR_OPTION;

    return (
      creatorFilters.find(option => option.key === filterValueFromSearchParams) ||
      DEFAULT_CREATOR_OPTION
    );
  };

  const initialTokenFilter = () => {
    const filterValueFromSearchParams = searchParams.get('tf');
    if (!filterValueFromSearchParams) return DEFAULT_TOKEN_OPTION;

    return (
      tokenFilters.find(option => option.key === filterValueFromSearchParams) ||
      DEFAULT_TOKEN_OPTION
    );
  };

  const [selectedCreatorOption, setSelectedCreatorOption] =
    useState(initialCreatorFilter());

  const [selectedTokenOption, setSelectedTokenOption] = useState(initialTokenFilter());

  const initialPage = () => {
    const page = searchParams.get('p');
    if (!page || isNaN(Number(page))) return 1;

    return Number(page);
  };

  const [page, setPage] = useState(initialPage());

  const searchFilterParams = isAddress(debouncedSearch)
    ? { id: debouncedSearch.toLowerCase() }
    : { title_contains_nocase: debouncedSearch };

  const marketsBaseParams = {
    first: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE,
    orderBy: selectedOrderOption.orderBy,
    orderDirection: selectedOrderOption.orderDirection,
    category_contains: category,
    ...selectedCreatorOption.when,
    ...selectedStateOption.when,
    ...selectedTokenOption.when,
    ...searchFilterParams,
  };

  const { data: openMarkets, isLoading: openMarketsLoading } = useQuery({
    queryKey: ['getOpenMarkets'],
    queryFn: getOpenMarkets,
    staleTime: Infinity,
    select: rankCategoriesByMarketCount,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      'getMarkets',
      debouncedSearch,
      selectedOrderOption.orderBy,
      selectedOrderOption.orderDirection,
      page,
      category,
      selectedStateOption.key,
      selectedCreatorOption.key,
      selectedTokenOption.key,
    ],
    queryFn: async () => getMarkets(marketsBaseParams),
  });

  const handleSearch = (query: string) => {
    query ? searchParams.set('s', query) : searchParams.delete('s');
    searchParams.delete('p');

    setSearch(query);
    setPage(1);

    router.replace(`?${searchParams.toString()}`);
  };

  const handleCategory = (category: CategoryOptions) => {
    setCategory(category);
    setPage(1);

    searchParams.delete('p');
    category ? searchParams.set('c', category) : searchParams.delete('c');
    router.replace(`?${searchParams.toString()}`);
  };

  const selectOrderFilter = (option: OrderFilter) => {
    setSelectedOrderOption(option);
    setOrderFilterPopoverOpen(false);
    setPage(1);

    searchParams.delete('p');
    searchParams.set('f', option.key);
    router.replace(`?${searchParams.toString()}`);
  };

  const selectStateFilter = (option: StateFilter) => {
    setSelectedStateOption(option);
    setStateFilterPopoverOpen(false);
    setPage(1);

    searchParams.delete('p');
    searchParams.set('sf', option.key);
    router.replace(`?${searchParams.toString()}`);
  };

  const selectCreatorFilter = (option: CreatorFilter) => {
    setSelectedCreatorOption(option);
    setCreatorFilterPopoverOpen(false);
    setPage(1);

    searchParams.delete('p');
    searchParams.set('cf', option.key);
    router.replace(`?${searchParams.toString()}`);
  };

  const selectTokenFilter = (option: TokenFilter) => {
    setSelectedTokenOption(option);
    setTokenFilterPopoverOpen(false);
    setPage(1);

    searchParams.delete('p');
    searchParams.set('tf', option.key);
    router.replace(`?${searchParams.toString()}`);
  };

  const handleNextPage = (page: number) => {
    if (page <= 0) return;

    if (page > 1) searchParams.set('p', page.toString());
    else searchParams.delete('p');

    setPage(page);
    router.replace(`?${searchParams.toString()}`);
  };

  const nextPage = page * ITEMS_PER_PAGE;

  const { data: marketsNextPage } = useQuery({
    queryKey: [
      'getMarkets',
      debouncedSearch,
      selectedOrderOption.orderBy,
      selectedOrderOption.orderDirection,
      nextPage,
      category,
      selectedStateOption.key,
      selectedCreatorOption.key,
    ],
    queryFn: async () => getMarkets({ ...marketsBaseParams, skip: nextPage }),
  });

  const hasMoreMarkets =
    marketsNextPage && marketsNextPage.fixedProductMarketMakers.length !== 0;
  const marketCategories = openMarkets?.length ? openMarkets : DEFAULT_CATEGORIES;
  const markets = data?.fixedProductMarketMakers;
  const showPaginationButtons = hasMoreMarkets || page !== 1;

  return (
    <div className="mt-12 justify-center space-y-8 px-6 md:flex md:flex-col md:items-center md:px-10 lg:px-20 xl:px-40">
      <MarketHighlight />
      {openMarketsLoading ? (
        <LoadingMarketCategories />
      ) : (
        <div className="w-full">
          <ToggleGroup
            value={category}
            onChange={handleCategory}
            className="overflow-x-auto md:w-auto lg:w-fit"
          >
            <ToggleGroupOption size="md" value={''} className="font-semibold">
              All
            </ToggleGroupOption>
            {marketCategories?.map(marketCategory => {
              const categoryOption = openMarkets?.length
                ? Object.keys(marketCategory)[0]
                : marketCategory;

              return (
                <ToggleGroupOption
                  key={categoryOption}
                  value={categoryOption}
                  className="font-semibold capitalize"
                  size="md"
                >
                  {categoryOption}
                </ToggleGroupOption>
              );
            })}
          </ToggleGroup>
        </div>
      )}
      <div className="flex w-full flex-wrap items-center gap-2 sm:flex-nowrap">
        <Input
          className="w-full"
          placeholder="Search markets keywords or address"
          leftIcon="search"
          onChange={event => handleSearch(event.target.value)}
          value={search}
        />
        {showClientUI ? (
          <Popover
            open={isCreatorFilterPopoverOpen}
            onOpenChange={setCreatorFilterPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button variant="pastel" className="space-x-2 text-nowrap">
                <p>{selectedCreatorOption.name}</p>
                <Icon name="chevron-down" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="px-1 py-2">
              {creatorFilters.map(option => (
                <div
                  key={option.key}
                  onClick={() => selectCreatorFilter(option)}
                  className="flex cursor-pointer items-center justify-start space-x-2 px-3 py-2 font-semibold"
                >
                  <Icon
                    className={cx({
                      invisible: selectedCreatorOption.key !== option.key,
                    })}
                    name="tick-fill"
                  />
                  <div className="flex items-center space-x-2">
                    <p>{option.name}</p>
                    {option.key === 'ai' && (
                      <Image src="/ai.svg" alt="ai" width={20} height={20} />
                    )}
                  </div>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        ) : (
          <Button variant="pastel" className="space-x-2 text-nowrap">
            <p>{selectedCreatorOption.name}</p>
            <Icon name="chevron-down" />
          </Button>
        )}
        {showClientUI ? (
          <Popover
            open={isTokenFilterPopoverOpen}
            onOpenChange={setTokenFilterPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button variant="pastel" className="space-x-2 text-nowrap">
                <p>{selectedTokenOption.name}</p>
                <Icon name="chevron-down" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="px-1 py-2">
              {tokenFilters.map(option => (
                <div
                  key={option.key}
                  onClick={() => selectTokenFilter(option)}
                  className="flex cursor-pointer items-center justify-start space-x-2 px-3 py-2 font-semibold"
                >
                  <Icon
                    className={cx({
                      invisible: selectedTokenOption.key !== option.key,
                    })}
                    name="tick-fill"
                  />
                  <p>{option.name}</p>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        ) : (
          <Button variant="pastel" className="space-x-2 text-nowrap">
            <p>{selectedTokenOption.name}</p>
            <Icon name="chevron-down" />
          </Button>
        )}
        {showClientUI ? (
          <Popover
            open={isOrderFilterPopoverOpen}
            onOpenChange={setOrderFilterPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button variant="pastel" className="space-x-2 text-nowrap">
                <p>{selectedOrderOption.name}</p>
                <Icon name="chevron-down" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="px-1 py-2">
              {orderFilters.map(option => (
                <div
                  key={option.key}
                  onClick={() => selectOrderFilter(option)}
                  className="flex cursor-pointer items-center justify-start space-x-2 px-3 py-2 font-semibold"
                >
                  <Icon
                    className={cx({
                      invisible: selectedOrderOption.key !== option.key,
                    })}
                    name="tick-fill"
                  />
                  <p>{option.name}</p>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        ) : (
          <Button variant="pastel" className="space-x-2 text-nowrap">
            <p>{selectedOrderOption.name}</p>
            <Icon name="chevron-down" />
          </Button>
        )}

        {showClientUI ? (
          <Popover
            open={isStateFilterPopoverOpen}
            onOpenChange={setStateFilterPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button variant="pastel" className="space-x-2 text-nowrap">
                <p>{selectedStateOption.name}</p>
                <Icon name="chevron-down" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="px-1 py-2">
              {stateFilters.map(option => (
                <div
                  key={option.key}
                  onClick={() => selectStateFilter(option)}
                  className="flex cursor-pointer items-center justify-start space-x-2 px-3 py-2 font-semibold"
                >
                  <Icon
                    className={cx({
                      invisible: selectedStateOption.key !== option.key,
                    })}
                    name="tick-fill"
                  />
                  <p>{option.name}</p>
                </div>
              ))}
            </PopoverContent>
          </Popover>
        ) : (
          <Button variant="pastel" className="space-x-2 text-nowrap">
            <p>{selectedStateOption.name}</p>
            <Icon name="chevron-down" />
          </Button>
        )}
      </div>
      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <LoadingCardMarket key={Number(index)} />
          ))}
        </div>
      ) : markets?.length ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {markets.map(market => (
            <Link key={market.id} href={`markets?id=${market.id}`}>
              <CardMarket market={market} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-bold w-full space-y-4 rounded-12 bg-surface-surface-1 px-6 py-10 text-center text-md">
          <p>No market found for current search</p>
        </div>
      )}
      {showClientUI && showPaginationButtons && (
        <div className="flex w-full justify-end space-x-4">
          <IconButton
            name="chevron-left"
            variant="pastel"
            onClick={() => handleNextPage(page - 1)}
            disabled={page === 1}
          />
          <div className="flex space-x-2">
            {page > 1 && (
              <Button
                className="h-[42px] w-[42px] p-3"
                variant="ghost"
                onClick={() => handleNextPage(page - 1)}
              >
                {page - 1}
              </Button>
            )}
            <Button className="h-[42px] w-[42px] p-3">{page}</Button>
            {hasMoreMarkets && (
              <Button
                className="h-[42px] w-[42px] p-3"
                variant="ghost"
                onClick={() => handleNextPage(page + 1)}
              >
                {page + 1}
              </Button>
            )}
          </div>
          <IconButton
            name="chevron-right"
            variant="pastel"
            onClick={() => handleNextPage(page + 1)}
            disabled={!hasMoreMarkets}
          />
        </div>
      )}
    </div>
  );
}

const LoadingMarketCategories = () => (
  <div className="w-full">
    <div className="flex h-12 w-[796px] items-center justify-between space-x-1 rounded-12 bg-surface-surface-2 px-3 py-1">
      {Array.from({ length: DEFAULT_CATEGORIES.length + 1 }).map((_, index) => (
        <Skeleton className="h-6 w-[80px]" key={index} />
      ))}
    </div>
  </div>
);

const MarketHighlight = () => {
  const { data: markets, isLoading } = useQueries({
    queries: Object.keys(highlightedMarketsList).map(id => ({
      queryKey: ['getMarket', id],
      queryFn: async () => getMarket({ id }),
    })),
    combine: results => {
      return {
        data: results
          .map(result => result.data?.fixedProductMarketMaker)
          .filter((market): market is FixedProductMarketMaker => !!market),
        isLoading: results.some(result => result.isPending),
      };
    },
  });

  if (markets.length === 0 || isLoading) return null;

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
      opts={{ loop: true }}
      className="group relative mb-6 w-full"
    >
      <CarouselSelector className="absolute bottom-0 left-0 right-0 z-50 mx-auto mb-4" />
      <div className="absolute bottom-0 right-0 z-50 mb-2 mr-6 flex space-x-2 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        <CarouselPrevious />
        <CarouselNext />
      </div>
      <CarouselContent>
        {markets.map(market => (
          <HighlightCarouselItem key={market.id} market={market} />
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const HighlightCarouselItem = ({ market }: { market: FixedProductMarketMaker }) => {
  const [image, setImage] = useState(highlightedMarketsList[market.id].image);
  const closingDate = new Date(+market.openingTimestamp * 1000);

  return (
    <CarouselItem key={market.id}>
      <Link
        href={`/markets?id=${market.id}`}
        target="_blank"
        className="flex h-auto w-full flex-col-reverse justify-between rounded-20 bg-surface-primary-main bg-gradient-to-b from-surface-surface-0 to-surface-surface-1 shadow-2 ring-1 ring-outline-base-em md:h-72 md:flex-row 2xl:h-96"
      >
        <div className="m-0 flex w-full max-w-2xl flex-col space-y-8 p-4 md:mx-6 md:my-8 md:mr-10 md:p-0 lg:mx-8 lg:mr-28">
          <div className="flex flex-col space-y-4">
            <p className="text-xs font-semibold text-text-low-em first-letter:uppercase md:text-sm">
              {remainingTime(closingDate)}
            </p>
            <p className="font-semibold md:text-lg lg:text-xl">{market.title}</p>
          </div>
          <OutcomeBar market={market} />
          <div className="flex items-center space-x-1">
            <TokenLogo address={market.collateralToken} className="size-3" />
            <p className="text-xs font-semibold text-text-med-em md:text-base">
              {formatEtherWithFixedDecimals(market.collateralVolume, 2)} Vol
            </p>
          </div>
        </div>
        <Image
          className="h-44 w-full rounded-e-0 rounded-t-20 md:h-full md:w-1/2 md:rounded-e-20 md:rounded-s-0 2xl:w-2/5"
          src={image}
          alt="Market highlight"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          onError={() => setImage(defaultHighlightImage)}
        />
      </Link>
    </CarouselItem>
  );
};
