import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/Table';
import { TransactionType, getMarketTransactions } from '@/queries/omen';
import {
  formatDateTime,
  formatEtherWithFixedDecimals,
  getGnosisAddressExplorerLink,
  shortenAddress,
} from '@/utils';
import { Tag, TagColorSchemeProp } from '@swapr/ui';
import { useQuery } from '@tanstack/react-query';

const getTagColorScheme = (transactionType: TransactionType): TagColorSchemeProp => {
  switch (transactionType) {
    case TransactionType.Buy:
      return 'success';
    case TransactionType.Sell:
      return 'danger';
    case TransactionType.Add:
      return 'info';
    case TransactionType.Remove:
      return 'quaternary';
    default:
      return 'info';
  }
};

export const ActivityTable = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getMarketTransactions', id],
    queryFn: async () =>
      getMarketTransactions({
        first: 20,
        id: id.toLowerCase(),
      }),
  });

  const activities = data?.fpmmTransactions ?? [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-text-low-em">Users</TableHead>
          <TableHead className="text-text-low-em">Action</TableHead>
          <TableHead className="text-text-low-em">Shares</TableHead>
          <TableHead className="text-right text-text-low-em">Date</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <TableBody className="text-base font-semibold">
          {activities.map(activity => (
            <TableRow key={activity.transactionHash}>
              <TableCell className="text-text-high-em">
                <a
                  href={getGnosisAddressExplorerLink(activity.user.id)}
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortenAddress(activity.user.id)}
                </a>
              </TableCell>
              <TableCell>
                <Tag
                  size="xs"
                  colorScheme={getTagColorScheme(activity.transactionType)}
                  className="w-fit uppercase"
                >
                  {activity.transactionType}
                </Tag>
              </TableCell>
              <TableCell className="truncate text-text-high-em">
                {formatEtherWithFixedDecimals(activity.sharesOrPoolTokenAmount)}
              </TableCell>
              <TableCell className="text-right text-text-low-em">
                {formatDateTime(activity.creationTimestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

const LoadingSkeleton = () => (
  <TableBody className="text-base font-semibold">
    {[1, 2, 3, 4, 5, 6, 7, 8].map(fakeActivity => (
      <TableRow key={fakeActivity}>
        <TableCell className="text-text-high-em">
          <div className="h-[18px] w-[90px] animate-pulse rounded-8 bg-outline-low-em"></div>
        </TableCell>
        <TableCell>
          <div className="h-[24px] w-[33px] animate-pulse rounded-8 bg-outline-low-em"></div>
        </TableCell>
        <TableCell className="truncate text-text-high-em">
          <div className="h-[24px] w-24 animate-pulse rounded-8 bg-outline-low-em"></div>
        </TableCell>
        <TableCell className="text-right text-text-low-em">
          <div className="h-[18px] w-[90px] animate-pulse rounded-8 bg-outline-low-em"></div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);
