
import { FlagCircle } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';


export const navigationList = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'country',
    title: 'Country',
    icon: <FlagCircle />,
    children: [
      {
        segment: 'list',
        title: 'List',
        icon: <FormatListBulletedIcon />,
      },
      // {
      //   segment: 'new',
      //   title: 'Create',
      //   icon: <AddCircleOutlineIcon />,
      // },
    ],
  },
  {
    segment: 'state',
    title: 'State',
    icon: <PublicIcon  />,
    children: [
      {
        segment: 'list',
        title: 'List',
        icon: <FormatListBulletedIcon />,
      },
    ],
  },
]