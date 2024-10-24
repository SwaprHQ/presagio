import { Icon, TabBody, TabGroup, TabHeader, TabPanel, TabStyled } from '@swapr/ui';
import { trackEvent } from 'fathom-client';

import { ActivityChart } from '@/app/(main)/markets/ActivityChart';
import { MarketActivity } from '@/app/(main)/markets/MarketActivity';
import { FA_EVENTS } from '@/constants';

interface HistorySectionProps {
  id: string;
}

export const HistorySection = ({ id }: HistorySectionProps) => {
  return (
    <div className="pt-4">
      <TabGroup>
        <TabHeader className="overflow-x-auto px-4 md:overflow-x-visible">
          <TabStyled className="space-x-2">
            <Icon size={18} name="activity"></Icon>
            <p>Activity</p>
          </TabStyled>
          <TabStyled
            className="space-x-2"
            onClick={() =>
              trackEvent(FA_EVENTS.MARKETS.DETAILS.TABS.NAME(id, 'history-charts'))
            }
          >
            <Icon size={18} name="pie-chart"></Icon>
            <p>Charts</p>
          </TabStyled>
        </TabHeader>
        <TabBody className="mt-4">
          <TabPanel>
            <MarketActivity id={id} />
          </TabPanel>
          <TabPanel className="p-2">
            <div className="h-48 rounded-8 bg-surface-surface-2">
              <ActivityChart id={id} />
            </div>
          </TabPanel>
        </TabBody>
      </TabGroup>
    </div>
  );
};
