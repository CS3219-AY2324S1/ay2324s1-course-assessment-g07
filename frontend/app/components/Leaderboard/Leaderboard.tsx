
import {
    Tabs,
    Tab,
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell,
    Button,
} from "@nextui-org/react"; 
import { WinIcon, DrawIcon, LoseIcon, CodeIcon } from '../History/HistoryIcons'

const Leaderboard = () => {
    const indicators = [<div key="win"><WinIcon/></div>, <div key="draw"><DrawIcon/></div>, <div key="lose"><LoseIcon/></div>];

    const dummyRows = [
        {
            userId: 123,
            userName: "dd",
            wins: 10,
            winRate: 0.5
        },
        {
            userId: 124,
            userName: "ff",
            wins: 5,
            winRate: 0.34
        },
        {
            userId: 124,
            userName: "fdf",
            wins: 3,
            winRate: 0.33
        },
        {
            userId: 144,
            userName: "frrr",
            wins: 2,
            winRate: 0.3
        }
    ]

    const tableStructure = (rows: any) => (
        <Table radius="sm" fullWidth={true}>
            <TableHeader>
                <TableColumn>RANK</TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn>WINS</TableColumn>
                <TableColumn>WIN %</TableColumn>
            </TableHeader>
            <TableBody>
                {rows.map((row : any, index: number) => (
                    <TableRow key={rows.userId}>
                        <TableCell>{index <= 2 ? indicators[index] : index + 1}</TableCell>
                        <TableCell>{row.userName}</TableCell>
                        <TableCell>{row.wins}</TableCell>
                        <TableCell>{row.winRate * 100}%</TableCell>
                    </TableRow>
                ))}     
            </TableBody>
        </Table>

    )

    
    const getUserIds = async () => {
        const res = await fetch("http://localhost:8000/users/getUser", {
            method: "GET",
            headers: {
                token: localStorage.token
            }
        })

        if (res.ok) {
            console.log("successfully get all user ids");
            return res.body;
        }
    }

    const getLeaders = async () => {
        try {
            const userIds = await getUserIds();

            const res = await fetch('http://localhost:8006/history/leaders', {
                method: "GET",
                headers: { token: localStorage.token },
                body: JSON.stringify({userIds: userIds}),
                cache: 'no-store'
            })
    
            if (res.ok) {
                console.log(res);
                console.log("leaders");
            }

        } catch (error) {
            console.log("error in getting leaders:", error);
        }

        
    }

    return (       
    <div className="ml-6 mr-6 lg:flex-grow md:w-5/6 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-lg mb-4 font-bold">Leaderboards</h1>
        <Tabs key='underlined' variant='underlined' className="w-full">
            <Tab key="today" title="Today" className="flex flex-col md:w-4/6">
                {tableStructure(dummyRows)}
            </Tab>
            <Tab key="week" title="This Week" className="flex flex-col md:w-4/6">
                {tableStructure(dummyRows)}
            </Tab>

            <Tab key="month" title="This Month" className="flex flex-col md:w-4/6">
                {tableStructure(dummyRows)}
            </Tab>

        </Tabs>
        <Button onClick={getLeaders}/>
    </div>)
}

export default Leaderboard;