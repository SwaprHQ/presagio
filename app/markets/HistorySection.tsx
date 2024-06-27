import { Icon, TabBody, TabGroup, TabHeader, TabPanel, TabStyled } from '@swapr/ui';

import { ActivityTable } from './ActivityTable';
import { ActivityChart } from './ActivityChart';

interface HistorySectionProps {
  id: string;
}

export const HistorySection = ({ id }: HistorySectionProps) => {
  return (
    <div className="p-2">
      <TabGroup>
        <TabHeader className="overflow-x-auto md:overflow-x-visible">
          <TabStyled className="space-x-2">
            <Icon size={18} name="activity"></Icon>
            <p>Activity</p>
          </TabStyled>
          <TabStyled className="space-x-2">
            <Icon size={18} name="pie-chart"></Icon>
            <p>Charts</p>
          </TabStyled>
        </TabHeader>
        <TabBody className="my-4">
          <TabPanel>
            <ActivityTable id={id} />
          </TabPanel>
          <TabPanel>
            <div className="h-48 rounded-8 bg-surface-surface-2">
              <ActivityChart id={id} />
            </div>
          </TabPanel>
        </TabBody>
      </TabGroup>
    </div>
  );
};
