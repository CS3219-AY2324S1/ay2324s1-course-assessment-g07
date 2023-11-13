import React from 'react';

import {
  Skeleton,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react';
import { WinIcon, DrawIcon, LoseIcon, CodeIcon } from '../History/HistoryIcons';

const Leaderboard = () => {
  const indicators = [
    <div key="win">
      <WinIcon />
    </div>,
    <div key="draw">
      <DrawIcon />
    </div>,
    <div key="lose">
      <LoseIcon />
    </div>,
  ];
  const [weeklyLeaders, setWeeklyLeaders] = React.useState([]);
  const [monthlyLeaders, setMonthlyLeaders] = React.useState([]);
  const [dailyLeaders, setDailyLeaders] = React.useState([]);

  const dummyRows = [
    {
      userId: 123,
      userName: 'dd',
      wins: 10,
      winRate: 0.5,
    },
    {
      userId: 124,
      userName: 'ff',
      wins: 5,
      winRate: 0.34,
    },
    {
      userId: 124,
      userName: 'fdf',
      wins: 3,
      winRate: 0.33,
    },
    {
      userId: 144,
      userName: 'frrr',
      wins: 2,
      winRate: 0.3,
    },
  ];

  React.useEffect(() => {
    const fetchLeaders = async () => {
      const leaders = await getLeaders();
      setWeeklyLeaders(leaders['week']);
      setMonthlyLeaders(leaders['month']);
      setDailyLeaders(leaders['day']);
    };
    fetchLeaders();
  }, []);

  const tableStructure = (rows: any, key: string) => {
    // if (rows.length == 0)
    //   return (
    //     <Table radius="sm" fullWidth={true} aria-label={key}>
    //       <TableHeader>
    //         <TableColumn>RANK</TableColumn>
    //         <TableColumn>NAME</TableColumn>
    //         <TableColumn>WINS</TableColumn>
    //         <TableColumn>WIN %</TableColumn>
    //       </TableHeader>
    //       <TableBody emptyContent={'No Leaders.'}>{[]}</TableBody>
    //     </Table>
    //   );
    return (
      <Table radius="sm" fullWidth={true} aria-label={key}>
        <TableHeader>
          <TableColumn>RANK</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>WINS</TableColumn>
          <TableColumn>WIN %</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
          <div className='pb-2'>
            <Skeleton className="rounded-lg  mt-4">
              <div className="h-5 w-3/5 bg-default-200"></div>
            </Skeleton>
            <Skeleton className="rounded-lg  mt-4">
              <div className="h-5 w-3/5 bg-default-200"></div>
            </Skeleton>
            <Skeleton className="rounded-lg  mt-4">
              <div className="h-5 w-3/5 bg-default-200"></div>
            </Skeleton>
            <Skeleton className="rounded-lg  mt-4">
              <div className="h-5 w-3/5 bg-default-200"></div>
            </Skeleton>
            <Skeleton className="rounded-lg  mt-4">
              <div className="h-5 w-3/5 bg-default-200"></div>
            </Skeleton>
          </div>
          }>
          {rows.map((row: any, index: number) => (
            <TableRow key={rows.userId}>
              <TableCell>
                {index <= 2 ? indicators[index] : index + 1}
              </TableCell>
              <TableCell>{row.userName}</TableCell>
              <TableCell>{row.totalWins}</TableCell>
              <TableCell>{(row.winRate * 100).toFixed(0)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const getLeaders = async () => {
    try {
      // const url = process.env.NODE_ENV === 'production' ? "34.123.40.181:30500" : 'localhost:8006';

      const url = process.env.NODE_ENV === 'production' ? '34.123.40.181:30500' : 'localhost:8006';
      
      console.log("history url: ", url);

      const res = await fetch(`http://${url}/history/getLeaders`, {
        method: 'GET',
        headers: { token: localStorage.token },
        cache: 'no-store',
      });

      if (res.ok) {
        const response = await res.json();
        console.log(response);
        return response;
        // console.log("leaders");
      }
    } catch (error) {
      console.log('error in getting leaders:', error);
    }
  };

  return (
    <div className="ml-6 mr-6 lg:flex-grow md:w-5/6 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-lg mb-4 pl-2 font-bold">
        Leaderboards
      </h1>
      <Tabs key="underlined" variant="underlined" className="w-full">
        <Tab key="today" title="Today" className="flex flex-col w-full pr-12">
          {tableStructure(dailyLeaders, 'day')}
        </Tab>
        <Tab key="week" title="This Week" className="flex flex-col w-full pr-12">
          {tableStructure([], 'week')}
        </Tab>

        <Tab key="month" title="This Month" className="flex flex-col w-full pr-12">
          {tableStructure(monthlyLeaders, 'month')}
        </Tab>
      </Tabs>
      {/* <Button onClick={getLeaders}/> */}
    </div>
  );
};

export default Leaderboard;
