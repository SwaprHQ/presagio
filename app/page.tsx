"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  FixedProductMarketMaker_OrderBy,
  OrderDirection,
  getMarkets,
} from "@/queries/omen";
import { CardMarket, LoadingCardMarket } from "@/app/components";
import {
  Button,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToggleGroup,
  ToogleGroupOption,
} from "swapr-ui";
import { useState } from "react";
import { useShowClientUI, useDebounce } from "@/hooks";
import { cx } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { AI_AGENTS_ALLOWLIST } from "@/constants";

type FilterOption = {
  name: string;
  orderBy: FixedProductMarketMaker_OrderBy;
};

const filterOptions: FilterOption[] = [
  {
    name: "Newest",
    orderBy: FixedProductMarketMaker_OrderBy.CreationTimestamp,
  },
  {
    name: "Highest volume",
    orderBy: FixedProductMarketMaker_OrderBy.CollateralVolume,
  },
];

const ITEMS_PER_PAGE = 12;
const SEARCH_DEBOUNCE_DELAY = 600;
const DEFAULT_FILTER_OPTION = filterOptions[0];

enum Categories {
  BUSINESS = "business",
  CRYPTO = "crypto",
  ECONOMY = "economy",
  ENTERTAINMENT = "entertainment",
  INTERNATIONAL = "international",
  POLITICS = "politics",
  SPORTS = "sports",
  TECHNOLOGY = "technology",
}

type CategoryOptions = Categories | "";

export default function HomePage() {
  const router = useRouter();
  const showClientUI = useShowClientUI();
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [category, setCategory] = useState<CategoryOptions>("");

  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams("/");

  const [search, setSearch] = useState(searchParams.get("s") || "");
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

  const initialFilter = () => {
    const filterValueFromSearchParams = searchParams.get("f");
    if (!filterValueFromSearchParams) return DEFAULT_FILTER_OPTION;

    return (
      filterOptions.find(
        option => option.orderBy === filterValueFromSearchParams
      ) || DEFAULT_FILTER_OPTION
    );
  };

  const [selectedOption, setSelectedOption] = useState(initialFilter());

  const initialPage = () => {
    const page = searchParams.get("p");
    if (!page || isNaN(Number(page))) return 1;

    return Number(page);
  };

  const [page, setPage] = useState(initialPage());

  const { data, isLoading } = useQuery({
    queryKey: [
      "getMarkets",
      debouncedSearch,
      selectedOption.orderBy,
      page,
      category,
    ],
    queryFn: async () =>
      getMarkets({
        first: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
        orderBy: selectedOption.orderBy,
        orderDirection: OrderDirection.Desc,
        title_contains_nocase: debouncedSearch,
        creator_in: AI_AGENTS_ALLOWLIST,
        category_contains: category,
      }),
  });

  const handleSearch = (query: string) => {
    query ? searchParams.set("s", query) : searchParams.delete("s");
    searchParams.delete("p");

    setSearch(query);
    setPage(1);

    router.replace(`?${searchParams.toString()}`);
  };

  const selectFilter = (option: FilterOption) => {
    setSelectedOption(option);
    setPopoverOpen(false);
    setPage(1);

    searchParams.delete("p");
    searchParams.set("f", option.orderBy);
    router.replace(`?${searchParams.toString()}`);
  };

  const handleNextPage = (page: number) => {
    if (page <= 0) return;

    if (page > 1) searchParams.set("p", page.toString());
    else searchParams.delete("p");

    setPage(page);
    router.replace(`?${searchParams.toString()}`);
  };

  const nextPage = page * ITEMS_PER_PAGE;

  const { data: marketsNextPage } = useQuery({
    queryKey: [
      "getMarkets",
      debouncedSearch,
      selectedOption.orderBy,
      nextPage,
      category,
    ],
    queryFn: async () =>
      getMarkets({
        first: ITEMS_PER_PAGE,
        skip: nextPage,
        orderBy: selectedOption.orderBy,
        orderDirection: OrderDirection.Desc,
        title_contains_nocase: debouncedSearch,
        creator_in: AI_AGENTS_ALLOWLIST,
        category_contains: category,
      }),
  });

  const hasMoreMarkets =
    marketsNextPage && marketsNextPage.fixedProductMarketMakers.length !== 0;

  const markets = data?.fixedProductMarketMakers;

  const showPaginationButtons = hasMoreMarkets || page !== 1;

  return (
    <div className="justify-center px-6 mt-12 space-y-8 md:px-10 lg:px-20 xl:px-40 md:flex md:flex-col md:items-center">
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-white capitalize">
          🔮 {category ? category : "All"}
        </h1>
      </div>
      <div className="flex flex-col justify-between w-full gap-5 md:flex-row">
        <ToggleGroup
          value={category}
          onChange={setCategory}
          // className="overflow-x-scroll"
        >
          <ToogleGroupOption value={""}>All</ToogleGroupOption>
          {Object.values(Categories).map(category => (
            <ToogleGroupOption
              key={category}
              value={category}
              className="capitalize font-bold"
            >
              {category}
            </ToogleGroupOption>
          ))}
        </ToggleGroup>
        <div className="flex items-center space-x-2">
          <Input
            className="w-full md:w-72"
            placeholder="Search market"
            leftIcon="search"
            onChange={event => handleSearch(event.target.value)}
            value={search}
          />
          {showClientUI ? (
            <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger>
                <Button variant="pastel" className="space-x-2 text-nowrap">
                  <p>{selectedOption.name}</p>
                  <Icon name="chevron-down" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="px-1 py-2">
                {filterOptions.map(option => {
                  return (
                    <div
                      key={option.name}
                      onClick={() => selectFilter(option)}
                      className="flex items-center justify-start px-3 py-2 space-x-2 font-semibold cursor-pointer"
                    >
                      <Icon
                        className={cx({
                          invisible: selectedOption.name !== option.name,
                        })}
                        name="tick-fill"
                      />
                      <p>{option.name}</p>
                    </div>
                  );
                })}
              </PopoverContent>
            </Popover>
          ) : (
            <Button variant="pastel" className="space-x-2 text-nowrap">
              <p>{selectedOption.name}</p>
              <Icon name="chevron-down" />
            </Button>
          )}
        </div>
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
        <div className="w-full px-6 py-10 space-y-4 text-center text-md bg-surface-surface-1 rounded-12 text-bold">
          <p>No market found for current search</p>
        </div>
      )}
      {showClientUI && showPaginationButtons && (
        <div className="flex justify-end w-full space-x-4">
          <IconButton
            name="chevron-left"
            variant="pastel"
            onClick={() => handleNextPage(page - 1)}
            disabled={page === 1}
          />
          <div className="flex space-x-2">
            {page > 1 && (
              <Button
                className="p-3 w-[42px] h-[42px]"
                variant="ghost"
                onClick={() => handleNextPage(page - 1)}
              >
                {page - 1}
              </Button>
            )}
            <Button className="p-3 w-[42px] h-[42px]">{page}</Button>
            {hasMoreMarkets && (
              <Button
                className="p-3 w-[42px] h-[42px]"
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
