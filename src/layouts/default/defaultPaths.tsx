
import { FlagCircle } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';


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
]