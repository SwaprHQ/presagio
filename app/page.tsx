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
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "swapr-ui";
import { useState } from "react";
import { useShowClientUI, useDebounce } from "@/hooks";
import { cx } from "class-variance-authority";

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

export default function HomePage() {
  const showClientUI = useShowClientUI();
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const [search, setSearch] = useState("");
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 600);

  const { data, isLoading } = useQuery({
    queryKey: ["getMarkets", debouncedSearch, selectedOption.orderBy],
    queryFn: async () =>
      getMarkets({
        first: ITEMS_PER_PAGE,
        skip: 0,
        orderBy: selectedOption.orderBy,
        orderDirection: OrderDirection.Desc,
        title_contains_nocase: debouncedSearch,
      }),
  });

  const markets = data?.fixedProductMarketMakers;

  return (
    <div className="justify-center px-6 mt-12 space-y-12 md:px-10 lg:px-20 xl:px-40 md:flex md:flex-col md:items-center">
      <div className="flex flex-col justify-between w-full gap-5 md:flex-row">
        <h1 className="text-2xl font-semibold text-white">🔮 All markets</h1>

        <div className="flex items-center space-x-2">
          <Input
            className="w-full md:w-72"
            placeholder="Search market"
            leftIcon="search"
            onChange={(event) => setSearch(event.target.value)}
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
                {filterOptions.map((option) => {
                  return (
                    <div
                      key={option.name}
                      onClick={() => {
                        setSelectedOption(option);
                        setPopoverOpen(false);
                      }}
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
          {[...Array(ITEMS_PER_PAGE)].map((index) => (
            <LoadingCardMarket key={index} />
          ))}
        </div>
      ) : markets?.length ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {markets.map((market) => (
            <Link key={market.id} href={`markets?id=${market.id}`}>
              <CardMarket market={market} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full px-6 py-10 space-y-4 text-center text-md bg-surface-surface-1 rounded-12 text-bold">
          <p>No market found for &quot;{debouncedSearch}&quot;</p>
        </div>
      )}
    </div>
  );
}
