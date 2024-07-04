import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  DefaultTooltipContentProps,
} from 'recharts';
import { cx } from 'class-variance-authority';
import { useQuery } from '@tanstack/react-query';
import { FpmmTrade_OrderBy, Query, getMarketTrades } from '@/queries/omen';
import request from 'graphql-request';
import { OMEN_SUBGRAPH_URL, XDAI_BLOCKS_SUBGRAPH_URL } from '@/constants';
import { format, fromUnixTime } from 'date-fns';
import { Market } from '@/entities';
import { useTheme } from 'next-themes';

const MAX_TRADES_AMOUNT = 999;

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;

  return `${(ratio * 100).toFixed(2)}%`;
};

interface ActivityChartProps {
  id: string;
}
type DataType = { time: string; 0: string; 1: string };
type BlockDataType = Record<string, { number: string }[]>;
type OutcomesDataType = Record<string, { outcomeTokenAmounts: string[] }>;

const OUTCOME_0 = '0';
const OUTCOME_1 = '1';

export const ActivityChart = ({ id }: ActivityChartProps) => {
  const { resolvedTheme } = useTheme();

  const { data: marketData, isFetching: isFetchingMarket } = useQuery<
    Pick<Query, 'fixedProductMarketMaker'>
  >({
    queryKey: ['getMarket', id],
  });
  const market = marketData?.fixedProductMarketMaker;

  const { data: trades } = useQuery({
    queryKey: ['getMarketTrades', id],
    queryFn: async () =>
      getMarketTrades({
        first: MAX_TRADES_AMOUNT,
        fpmm: id,
        orderBy: FpmmTrade_OrderBy.CreationTimestamp,
      }),
  });

  const { data, isFetching } = useQuery({
    queryKey: ['getMarketOutcomesHistory', id],
    queryFn: async (): Promise<DataType[] | undefined> => {
      if (!trades) return;

      const tradesTimestamp = trades.fpmmTrades.map(trade => trade.creationTimestamp);

      const queryBlocks = `query blockNumberByTimestamp {
          ${tradesTimestamp.map(
            timestamp => `_${timestamp}: blocks(where: {timestamp: ${timestamp}}, first: 1) {
              number
            }`
          )}
        }`;

      const blockNumbers = await request<BlockDataType>(
        XDAI_BLOCKS_SUBGRAPH_URL,
        queryBlocks
      );

      let tradesBlockNumbers = Object.values(blockNumbers).map(value => value[0].number);
      tradesBlockNumbers = Array.from(new Set(tradesBlockNumbers));

      if (!tradesBlockNumbers) return;

      const queryOutcomeTokenAmounts = `query outcomeTokenAmountsByBlockNumber($id: ID!) {
          ${tradesBlockNumbers.map(
            timestamp => `_${timestamp}: fixedProductMarketMaker(id: $id, block: { number: ${timestamp} }) {
              outcomeTokenAmounts
            }`
          )}
        }`;

      const outcomeTokenAmounts = await request<OutcomesDataType>(
        OMEN_SUBGRAPH_URL,
        queryOutcomeTokenAmounts,
        {
          id,
        }
      );

      return Object.values(outcomeTokenAmounts).map((value, index) => {
        const outcomes = Object.assign(
          { 0: '', 1: '' },
          value.outcomeTokenAmounts.reverse()
        );
        return { time: tradesTimestamp[index], ...outcomes };
      });
    },
    enabled: !!trades,
  });

  if (isFetching || isFetchingMarket)
    return <div className="h-full w-full animate-pulse rounded-8 bg-outline-low-em" />;

  if (!data || !market)
    return (
      <p className="flex h-full items-center justify-center text-md">
        No available data.
      </p>
    );

  const TooltipContent = (chartData: DefaultTooltipContentProps<number, string>) => {
    const { payload } = chartData;

    if (!payload || !payload[0] || !payload[1]) return;

    const total = payload.reduce(
      (result, entry) => (entry.value ? result + +entry.value : 0),
      0
    );
    const tradeTime = format(fromUnixTime(+payload[0].payload.time), 'HH:mm dd/MM/yy');

    return (
      <div className="rounded-12 bg-surface-surface-0 p-3 shadow-4">
        <p>Bets: {data.length}</p>
        <ul>
          {payload
            .sort((a, b) => {
              if (!a.dataKey || !b.dataKey) return 0;
              return +b.dataKey - +a.dataKey;
            })
            .map((entry, index) => (
              <li
                key={index}
                className={cx({
                  'text-text-danger-em': entry.dataKey === OUTCOME_1,
                  'text-text-success-em': entry.dataKey === OUTCOME_0,
                })}
              >
                {`${entry.name}: ${entry.value ? getPercent(entry.value, total) : '-'}`}
              </li>
            ))}
        </ul>
        <p className="text-text-low-em">{tradeTime}</p>
      </div>
    );
  };

  const lastDataPoint = data[data.length - 1];
  const total = +lastDataPoint[OUTCOME_0] + +lastDataPoint[OUTCOME_1];

  const marketModel = new Market(market);
  const isLightTheme = resolvedTheme === 'light';

  return (
    <ResponsiveContainer width="100%" height="100%" className="border-radius-svg">
      <AreaChart
        width={500}
        height={400}
        data={data}
        stackOffset="expand"
        margin={{
          left: 0,
          bottom: 0,
        }}
      >
        <Tooltip content={TooltipContent} />
        <Area
          type="monotone"
          dataKey={OUTCOME_0}
          name={marketModel.outcomes[OUTCOME_0].symbol}
          stackId="1"
          fill={isLightTheme ? '#AFFAD0FF' : '#134228'}
          stroke={isLightTheme ? '#D9D8DCFF' : '#FFFFFF3D'}
          activeDot={{ r: 4, fill: 'white', stroke: 'black', strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey={OUTCOME_1}
          name={marketModel.outcomes[OUTCOME_1].symbol}
          stackId="1"
          fill={isLightTheme ? '#FFE0E0FF' : '#3F1E1E'}
          stroke="none"
          activeDot={false}
        />

        <text
          x="97%"
          y="90%"
          textAnchor="end"
          className="fill-text-success-em font-semibold uppercase"
        >
          {getPercent(+lastDataPoint[OUTCOME_0], total)} -{' '}
          {marketModel.outcomes[OUTCOME_0].symbol}
        </text>
        <text
          x="97%"
          y="15%"
          textAnchor="end"
          className="fill-text-danger-em font-semibold uppercase"
        >
          {getPercent(+lastDataPoint[OUTCOME_1], total)} -{' '}
          {marketModel.outcomes[OUTCOME_1].symbol}
        </text>
      </AreaChart>
    </ResponsiveContainer>
  );
};
