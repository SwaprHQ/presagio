import { ActivityTable } from '@/app/markets/ActivityTable';
import { Icon, TabBody, TabGroup, TabHeader, TabPanel, TabStyled } from 'swapr-ui';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { cx } from 'class-variance-authority';

const data = [
  {
    month: '2024.01',
    No: 0.6,
    Yes: 0.4,
  },
  {
    month: '2024.02',
    No: 0.5,
    Yes: 0.5,
  },
  {
    month: '2024.03',
    No: 0.4,
    Yes: 0.6,
  },
  {
    month: '2024.04',
    No: 0.6,
    Yes: 0.4,
  },
  {
    month: '2024.05',
    No: 0.7,
    Yes: 0.3,
  },
  {
    month: '2024.06',
    No: 0.75,
    Yes: 0.25,
  },
  {
    month: '2024.07',
    No: 0.8,
    Yes: 0.2,
  },
];

const TooltipContent = (o: any) => {
  const { payload } = o;

  return (
    <div className="rounded-12 bg-surface-surface-0 p-3 shadow-4">
      <p>{`Bets: 30`}</p>
      <ul>
        {payload.map((entry: any, index: number) => (
          <li
            key={index}
            className={cx({
              'text-text-danger-em': entry.name === 'No',
              'text-text-success-em': entry.name === 'Yes',
            })}
          >
            {`${entry.name}: ${entry.value * 100}%`}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Chart = () => {
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
          dataKey="No"
          name="No"
          stackId="1"
          stroke="#FFFFFF3D"
          fill="#134228"
          className="rounded-8"
          activeDot={{ r: 4, fill: 'white', stroke: 'black', strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="Yes"
          name="Yes"
          stackId="1"
          stroke="none"
          fill="#3F1E1E"
          activeDot={false}
        />
        <text
          x="97%"
          y="15%"
          text-anchor="end"
          className="fill-text-danger-em font-semibold"
        >
          61.07% - NO
        </text>
        <text
          x="97%"
          y="90%"
          text-anchor="end"
          className="fill-text-success-em font-semibold"
        >
          38.93% - YES
        </text>
      </AreaChart>
    </ResponsiveContainer>
  );
};

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
            <div className="h-48 rounded-8 bg-surface-surface-2">
              <div className="h-full">
                <Chart />
              </div>
            </div>
          </TabPanel>
        </TabBody>
      </TabGroup>
    </div>
  );
};
