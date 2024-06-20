import {
  Icon,
  TabBody,
  TabGroup,
  TabHeader,
  TabPanel,
  TabStyled,
} from "swapr-ui";

export const HistorySection = () => {
  return (
    <div className="p-2">
      <TabGroup
        onChange={(index: number) =>
          console.log("Changed selected tab to:", index)
        }
      >
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
            <div className="bg-surface-surface-2 h-44 rounded-8">
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center space-y-2">
                  <Icon name="filter" size={24} />
                  <p>Activity coming soon</p>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="bg-surface-surface-2 h-44 rounded-8">
              <div className="flex items-center justify-center h-full">
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
