import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/Table";
import { formatDateTime, shortenAddress } from "@/utils";
import { Tag } from "swapr-ui";

const activities = [
  {
    user: "0x8a05649a4fa186d032376f6d34f6bf40ca0168ae",
    action: "Yes",
    shares: "1.24",
    date: 1718999911,
  },
  {
    user: "0x1b3bbecdcb76594e1dc5f7550263cd5ea4a6ab6d",
    action: "No",
    shares: "2.3",
    date: 1718999111,
  },
  {
    user: "0x7532a3ce4d80cc3fb71d69a5329f76f9f375aa27",
    action: "Yes",
    shares: "32.2",
    date: 1718912111,
  },
  {
    user: "0x2fe3e7422f35ecbb9dca542279fb2ee172faab32",
    action: "Yes",
    shares: 23.1,
    date: 1718903353,
  },
  {
    user: "0x269e4c1cb7d8586a99baca522db8c2ef72bbf3ac",
    action: "No",
    shares: 12.2,
    date: 1718901111,
  },
  {
    user: "0xf9d7aeaa523906f59070eee225f16c7893e2b262",
    action: "Yes",
    shares: 0.42,
    date: 1718801111,
  },
];

export const ActivityTable = () => {
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
      <TableBody className="text-base font-semibold">
        {activities.map(activity => (
          <TableRow key={activity.user}>
            <TableCell className="text-text-high-em">
              {shortenAddress(activity.user)}
            </TableCell>
            <TableCell className="">
              <Tag
                size="xs"
                colorScheme={activity.action === "Yes" ? "success" : "danger"}
                className="uppercase w-fit"
              >
                {activity.action}
              </Tag>
            </TableCell>
            <TableCell className="text-text-high-em">
              {activity.shares}
            </TableCell>
            <TableCell className="text-right text-text-low-em">
              {formatDateTime(activity.date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
