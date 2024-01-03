import Box from '@mui/material/Box'
import SelectMode from '~/components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Profile from './Menus/Profile'
import Template from './Menus/Template'
import Starred from './Menus/Starred'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

function AppBar() {
  return (
    <Box px={2} sx ={{
      height: (theme) => theme.trello.appBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color:'primary.main' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color:'primary.main' }} />
          <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color:'primary.main' }} variant="span">Trello</Typography>
        </Box>

        <Workspaces/>
        <Recent/>
        <Starred/>
        <Template/>
        <Button variant="outlined">Create</Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <TextField id="outlined-search" label="Search..." type="search" size="small" />
        <SelectMode/>

        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon/>
          </Badge>
        </Tooltip>

        <Profile/>
      </Box>
    </Box>
  )
}

export default AppBar
