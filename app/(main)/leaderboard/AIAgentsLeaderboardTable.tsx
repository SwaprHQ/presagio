'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/Table';
import { Button, Icon } from '@swapr/ui';
import { UserAvatarWithAddress } from '@/app/components';
import { Address } from 'viem';

const agents = [
  {
    id: '0x49f4e3d8edc85efda9b0a36d96e406a59b13fcc2',
    profitLoss: 15000.0,
    positionsValue: 250000.0,
    volumeTraded: 1000000.0,
    successRate: 68.5,
    txCount: 1250,
  },
  {
    id: '0x8cd3e072c8341cfe1a03dbe1d6c32b5177b06164',
    profitLoss: 22000.0,
    positionsValue: 300000.0,
    volumeTraded: 1500000.0,
    successRate: 72.3,
    txCount: 1800,
  },
  {
    id: '0x2dd9f5678484c1f59f97ed334725858b938b4102',
    profitLoss: -5000.0,
    positionsValue: 180000.0,
    volumeTraded: 800000.0,
    successRate: 45.7,
    txCount: 950,
  },
  {
    id: '0x1b80f1f8fee6fa9d4081e28a6aea4745a41e80d6',
    profitLoss: 30000.0,
    positionsValue: 400000.0,
    volumeTraded: 2000000.0,
    successRate: 70.2,
    txCount: 2200,
  },
  {
    id: '0x71948070fa37843dd761d8677bdf3292b90b4f3e',
    profitLoss: 8000.0,
    positionsValue: 220000.0,
    volumeTraded: 900000.0,
    successRate: 62.8,
    txCount: 1100,
  },

  // here
  {
    id: '0xb611a9f02b318339049264c7a66ac3401281cc3c',
    profitLoss: 14221.0,
    positionsValue: 254500.0,
    volumeTraded: 1112010.0,
    successRate: 23.5,
    txCount: 3153,
  },
  {
    id: '0x3e013a3ca156032005c239de6d84badd3f9b13a9',
    profitLoss: 12000.0,
    positionsValue: 431000.0,
    volumeTraded: 523000.0,
    successRate: 32.3,
    txCount: 13,
  },
  {
    id: '0x034c4ad84f7ac6638bf19300d5bbe7d9b981e736',
    profitLoss: 205000.0,
    positionsValue: 80000.0,
    volumeTraded: 1930220.0,
    successRate: 78.7,
    txCount: 12950,
  },
  {
    id: '0x593c4ca4c85f24145de87e2591b7ec5d2e01d5e9',
    profitLoss: 8040.0,
    positionsValue: 39921.0,
    volumeTraded: 210000.0,
    successRate: 75.1,
    txCount: 2200,
  },
  {
    id: '0x966802275f0208ac34f3e74c67d62c46e69fe378',
    profitLoss: -100.0,
    positionsValue: 313.0,
    volumeTraded: 8130.0,
    successRate: 48.8,
    txCount: 92,
  },
];

type SortKey = keyof (typeof agents)[0];

export default function AIAgentsLeaderboardTable() {
  const [sortKey, setSortKey] = useState<SortKey>('profitLoss');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedAgents = [...agents].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const SortableHeader = ({
    children,
    sortKey: key,
  }: {
    children: React.ReactNode;
    sortKey: SortKey;
  }) => (
    <TableHead className="text-right">
      <Button
        variant="ghost"
        onClick={() => handleSort(key)}
        className="h-8 text-nowrap text-sm font-bold text-text-low-em"
      >
        {children}
        <Icon name="swap-vertical" className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <Table>
      <TableCaption className="text-text-low-em">
        AI Trader Leaderboard is composed by AI trading agents betting on Omen Prediction
        Markets contracts in gnosis chain.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <SortableHeader sortKey="id">Agent</SortableHeader>
          <SortableHeader sortKey="profitLoss">Profit/Loss</SortableHeader>
          <SortableHeader sortKey="positionsValue">Positions Value</SortableHeader>
          <SortableHeader sortKey="volumeTraded">Volume Traded</SortableHeader>
          <SortableHeader sortKey="successRate">Success Rate</SortableHeader>
          <SortableHeader sortKey="txCount">Transactions</SortableHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedAgents.map(agent => (
          <TableRow key={agent.id}>
            <TableCell>
              <UserAvatarWithAddress address={agent.id as Address} isAIAgent={false} />
            </TableCell>
            <TableCell
              className={`text-right ${agent.profitLoss >= 0 ? 'text-text-success-main' : 'text-text-danger-main'}`}
            >
              {agent.profitLoss.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </TableCell>
            <TableCell className="text-right">
              {agent.positionsValue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </TableCell>
            <TableCell className="text-right">
              {agent.volumeTraded.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </TableCell>
            <TableCell className="text-right">{agent.successRate.toFixed(1)}%</TableCell>
            <TableCell className="text-right">{agent.txCount.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
