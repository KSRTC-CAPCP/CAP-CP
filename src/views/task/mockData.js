// const IconBox = require("./test.png");
const IconBox = require('./text.png')
const IconBoxs = require('./Darla.png');
import FlagIcon from '@mui/icons-material/Flag';

export const TASKS = [
  {
    id: 1,
    status: "In Backlog",
    image: IconBox,
    time: "8 hrs",
    days: "5 days left",
    title:'Darla',
    description:'Do Work Here ',
    icon:<FlagIcon/>
  },
 
  {
    id: 2,
    status: "In Progress",
    image: IconBoxs,
    time: "6 hrs",
    days: "6 days left",
    done: false,
    title:'Darla',
    description:'Do Work Here',
    icon:<FlagIcon/>
    
  },
  {

    id: 3,
    status: "Completed",
    image: IconBox,
    time: "13 hrs",
    days: "4 days left",
    title:'Darla',
    description:'Do Work Here',
    icon:<FlagIcon/>
  },
  {
    id: 4,
    status: "In Backlog",
    image: IconBoxs,
    time: "22 hrs",
    days: "2 days left",
    done: true,
    title:'Darla',
    description:'Do Work Here',
    icon:<FlagIcon/>
  },
  {
    id: 5,
    status: "In Progress",
    image: IconBox,
    time: "2 hrs",
    days: "1 day left",
    newOrder: true,
    done: false,
    title:'Darla',
    description:'Do Work Here',
    icon:<FlagIcon/>
  },
  {
    id: 6,
    status: "Completed",
    image: IconBoxs,
    time: "20 hrs",
    days: "11 days left",
    done: true,
    title:'Darla',
    description:'Do Work Here',
    icon:<FlagIcon/>
  },
  {
    id: 5,
    status: "In Review",
    image: IconBox,
    time: "2 hrs",
    days: "1 day left",
    done: false,
    title:'Darla',
    description:'Do Work Here',
    icon:<FlagIcon/>
  }
];


