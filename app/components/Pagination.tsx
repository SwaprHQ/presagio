'use client';

import { cx } from 'class-variance-authority';

import { Button, Icon } from '@swapr/ui';

interface PaginationProps {
  isFinalPage: boolean;
  page: number;
  setPage: (page: number) => void;
}

export const Pagination = ({ isFinalPage, page, setPage }: PaginationProps) => (
  <div className="flex w-full items-center justify-between bg-surface-surface-1 p-4">
    <Button
      variant="pastel"
      onClick={() => setPage(page - 1)}
      className={cx('space-x-2', { invisible: page === 1 })}
    >
      <Icon name="chevron-left" />
      <p>Prev</p>
    </Button>
    <p className="font-semibold text-text-med-em">Page {page}</p>
    <Button
      variant="pastel"
      onClick={() => setPage(page + 1)}
      className={cx('space-x-2', { invisible: isFinalPage })}
    >
      <p>Next</p>
      <Icon name="chevron-right" />
    </Button>
  </div>
);
