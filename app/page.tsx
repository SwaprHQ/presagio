'use client';

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getMarkets } from '@/queries/omen';
import { CardMarket, LoadingCardMarket } from '@/app/components';
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
import { getMarketCategories, getOpenMarkets } from '@/queries/dune';
import { Categories } from '@/constants';

const ITEMS_PER_PAGE = 12;
const SEARCH_DEBOUNCE_DELAY = 600;
const DEFAULT_ORDER_OPTION = orderFilters[0];
const DEFAULT_STATE_OPTION = stateFilters[0];
const DEFAULT_CREATOR_OPTION = creatorFilters[0];
const DEFAULT_TOKEN_OPTION = tokenFilters[0];

type CategoryOptions = Categories | '';

const groupOpenMarketsByCategory = (data: any) => {
  if (!data) return [];
  const marketsGroupedByCategory = Object.groupBy(
    data,
    (market: { Category: string }) => market.Category
  );

  if (!marketsGroupedByCategory) return [];

  const categoryCounts = Object.values(Categories).map(category => {
    const count = marketsGroupedByCategory[category]?.length || 0;
    return { [category]: count };
  });

  return categoryCounts.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
};

const buildSortedMarketArray = (data: any) => {
  if (!data) return [];

  const allMarketsSortedCategories: { [key: string]: number }[] = [];

  for (const category of Object.values(Categories)) {
    const market = data.find(
      ({ category: categoryOption }: { category: string }) => categoryOption === category
    );
    const count = market ? market.cnt : 0;
    allMarketsSortedCategories.push({ [category]: count });
  }

  allMarketsSortedCategories.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);

  return allMarketsSortedCategories;
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
  }

  const [selectedCreatorOption, setSelectedCreatorOption] =
    useState(initialCreatorFilter());

  const [selectedTokenOption, setSelectedTokenOption] =
    useState(initialTokenFilter());

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

  const { data: openMarkets } = useQuery({
    queryKey: ['getOpenMarkets'],
    queryFn: getOpenMarkets,
    staleTime: Infinity,
    select: groupOpenMarketsByCategory,
  });

  const { data: marketCategories } = useQuery({
    queryKey: ['getMarketCategories'],
    queryFn: getMarketCategories,
    staleTime: Infinity,
    select: buildSortedMarketArray,
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
  }

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

  const markets = data?.fixedProductMarketMakers;

  const showPaginationButtons = hasMoreMarkets || page !== 1;

  return (
    <div className="mt-12 justify-center space-y-8 px-6 md:flex md:flex-col md:items-center md:px-10 lg:px-20 xl:px-40">
      <div className="w-full">
        <p>Current solution</p>
        <ToggleGroup
          value={category}
          onChange={handleCategory}
          className="overflow-x-scroll md:overflow-x-auto"
        >
          <ToggleGroupOption size="md" value={''} className="font-semibold">
            All
          </ToggleGroupOption>
          {Object.values(Categories).map(category => (
            <ToggleGroupOption
              key={category}
              value={category}
              className="font-semibold capitalize"
              size="md"
            >
              {category}
            </ToggleGroupOption>
          ))}
        </ToggleGroup>
      </div>
      <div className="w-full">
        <p>Only open markets, desc sorted by qty of markets per category</p>
        <ToggleGroup
          value={category}
          onChange={handleCategory}
          className="overflow-x-scroll md:overflow-x-auto"
        >
          <ToggleGroupOption size="md" value={''} className="font-semibold">
            All
          </ToggleGroupOption>
          {openMarkets?.map((marketCategory, idx) => {
            const categoryOption = Object.keys(marketCategory)[0];
            const showFireEmoji = idx === 0;

            return (
              <ToggleGroupOption
                key={categoryOption}
                value={categoryOption}
                className="font-semibold capitalize"
                size="md"
              >
                {`${showFireEmoji ? '🔥 ' : ''}${categoryOption}`}
              </ToggleGroupOption>
            );
          })}
        </ToggleGroup>
      </div>
      <div className="w-full">
        <p>All (open, closed, etc) markets, desc sorted by qty of markets per category</p>
        <ToggleGroup
          value={category}
          onChange={handleCategory}
          className="overflow-x-scroll md:overflow-x-auto"
        >
          <ToggleGroupOption size="md" value={''} className="font-semibold">
            All
          </ToggleGroupOption>
          {marketCategories?.map((marketCategory, idx) => {
            const categoryOption = Object.keys(marketCategory)[0];
            const showFireEmoji = idx === 0;

            return (
              <ToggleGroupOption
                key={categoryOption}
                value={categoryOption}
                className="font-semibold capitalize"
                size="md"
              >
                {`${showFireEmoji ? '🔥 ' : ''}${categoryOption}`}
              </ToggleGroupOption>
            );
          })}
        </ToggleGroup>
      </div>
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
