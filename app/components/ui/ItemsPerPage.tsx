'use client';

import { cx } from 'class-variance-authority';

import { Button, Icon, Popover, PopoverContent, PopoverTrigger } from '@swapr/ui';

interface ItemsPerPageProps {
  isOpen: boolean;
  label: string;
  onChange: (itemsPerPage: number) => void;
  onOpenChange: (isOpen: boolean) => void;
  options: number[];
  value: number;
}

export const ItemsPerPage = ({
  isOpen,
  label,
  onChange,
  onOpenChange,
  options,
  value,
}: ItemsPerPageProps) => {
  return (
    <div className="flex items-center gap-2">
      <p>{label}</p>
      <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button variant="pastel" className="space-x-2 text-nowrap">
            <p>{value}</p>
            <Icon name="chevron-down" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="px-1 py-2">
          {options.map(option => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
              }}
              className="flex cursor-pointer items-center justify-start space-x-2 px-3 py-2 font-semibold"
            >
              <Icon
                className={cx({
                  invisible: value !== option,
                })}
                name="tick-fill"
              />
              <p>{option}</p>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};
