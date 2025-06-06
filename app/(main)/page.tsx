'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getMarkets } from '@/queries/omen';
import { CardMarket, LoadingCardMarket, Skeleton } from '@/app/components';
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
import { useEffect, useMemo, useRef, useState } from 'react';
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
import { trackEvent } from 'fathom-client';

import { FA_EVENTS } from '@/analytics';
import { getOpenMarkets } from '@/queries/dune';
import { Categories } from '@/constants';

import { MarketsHighlight } from './MarketsHighlight';
import { AiChatLanding } from '@/app/components';

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
  const initialHighlightMarketsRef = useRef<typeof markets | null>(null);

  useEffect(() => {
    if (!initialHighlightMarketsRef.current && markets?.length) {
      initialHighlightMarketsRef.current = markets;
    }
  }, [markets]);

  const highlightMarkets = useMemo(() => {
    return initialHighlightMarketsRef.current ?? markets ?? [];
  }, [markets]);

  const showPaginationButtons = hasMoreMarkets || page !== 1;

  return (
    <div className="mb-32 mt-12 justify-center space-y-8 px-6 md:flex md:flex-col md:items-center md:px-10 lg:px-20 xl:px-40">
      <MarketsHighlight markets={highlightMarkets} />
      {openMarketsLoading ? (
        <LoadingMarketCategories />
      ) : (
        <div className="w-full">
          <ToggleGroup
            value={category}
            onChange={handleCategory}
            className="overflow-x-auto md:w-auto lg:w-fit"
          >
            <ToggleGroupOption
              size="md"
              value=""
              className="font-semibold"
              onClick={() => trackEvent(FA_EVENTS.MARKETS.CATEGORY('all'))}
            >
              All
            </ToggleGroupOption>
            {marketCategories?.map(marketCategory => {
              const categoryOption = Object.keys(marketCategory)[0];

              return (
                <ToggleGroupOption
                  key={categoryOption}
                  value={categoryOption}
                  className="font-semibold capitalize"
                  size="md"
                  onClick={() =>
                    trackEvent(FA_EVENTS.MARKETS.CATEGORY(categoryOption as string))
                  }
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
          onClick={() => trackEvent(FA_EVENTS.MARKETS.SEARCH_BAR)}
          value={search}
        />
        {showClientUI ? (
          <Popover
            open={isCreatorFilterPopoverOpen}
            onOpenChange={setCreatorFilterPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button variant="secondary">
                <p>{selectedCreatorOption.name}</p>
                <Icon name="chevron-down" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="px-1 py-2">
              {creatorFilters.map(option => (
                <div
                  key={option.key}
                  onClick={() => {
                    selectCreatorFilter(option);
                    trackEvent(FA_EVENTS.MARKETS.FILTERS.CREATOR(option.name));
                  }}
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
          <Button variant="secondary">
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
              <Button variant="secondary">
                <p>{selectedTokenOption.name}</p>
                <Icon name="chevron-down" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="px-1 py-2">
              {tokenFilters.map(option => (
                <div
                  key={option.key}
                  onClick={() => {
                    selectTokenFilter(option);
                    trackEvent(FA_EVENTS.MARKETS.FILTERS.TOKEN(option.name));
                  }}
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
          <Button variant="secondary">
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
              <Button variant="secondary">
                <p>{selectedOrderOption.name}</p>
                <Icon name="chevron-down" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="px-1 py-2">
              {orderFilters.map(option => (
                <div
                  key={option.key}
                  onClick={() => {
                    selectOrderFilter(option);
                    trackEvent(FA_EVENTS.MARKETS.FILTERS.ORDER(option.name));
                  }}
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
          <Button variant="secondary">
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
              <Button variant="secondary">
                <p>{selectedStateOption.name}</p>
                <Icon name="chevron-down" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="px-1 py-2">
              {stateFilters.map(option => (
                <div
                  key={option.key}
                  onClick={() => {
                    selectStateFilter(option);
                    trackEvent(FA_EVENTS.MARKETS.FILTERS.STATE(option.name));
                  }}
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
          <Button variant="secondary">
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
            <Link
              key={market.id}
              href={`markets?id=${market.id}`}
              onClick={() => trackEvent(FA_EVENTS.MARKETS.DETAILS.ID(market.id))}
            >
              <CardMarket market={market} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4 py-16 text-center">
          <p>No market found for current search</p>
        </div>
      )}
      {showClientUI && showPaginationButtons && (
        <div className="flex w-full justify-end space-x-4">
          <IconButton
            size="sm"
            name="chevron-left"
            variant="secondary"
            onClick={() => handleNextPage(page - 1)}
            disabled={page === 1}
          />
          <div className="flex space-x-2">
            {page > 1 && (
              <Button size="sm" variant="ghost" onClick={() => handleNextPage(page - 1)}>
                {page - 1}
              </Button>
            )}
            <Button variant="light" size="sm">
              {page}
            </Button>
            {hasMoreMarkets && (
              <Button size="sm" variant="ghost" onClick={() => handleNextPage(page + 1)}>
                {page + 1}
              </Button>
            )}
          </div>
          <IconButton
            size="sm"
            name="chevron-right"
            variant="secondary"
            onClick={() => handleNextPage(page + 1)}
            disabled={!hasMoreMarkets}
          />
        </div>
      )}
      <AiChatLanding markets={markets} />
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
