import { ActivityTable } from '@/app/markets/ActivityTable';
import { Icon, TabBody, TabGroup, TabHeader, TabPanel, TabStyled } from '@swapr/ui';

export const HistorySection = ({ id }: { id: string }) => {
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
            <div className="h-44 rounded-8 bg-surface-surface-2">
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-2">
                  <Icon name="bar-graph" size={24} />
                  <p>Charts coming soon.</p>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabBody>
      </TabGroup>
    </div>
  );
};
