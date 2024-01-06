import { useState } from 'react'
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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'


function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box sx ={{
      gap: 2,
      paddingX: 2,
      width: '100%',
      display: 'flex',
      overflowX: 'auto',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: (theme) => theme.trello.appBarHeight,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color:'white' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color:'white', fontSize: 'small' }} />
          <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color:'white' }} variant="span">Trello</Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces/>
          <Recent/>
          <Starred/>
          <Template/>
          <Button
            sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
            variant="outlined"
            startIcon={<LibraryAddIcon />}>
              Create</Button>
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize= "small"
                sx={{ color: searchValue ? 'white': 'transparent', cursor: 'pointer' }}
                onClick={() => setSearchValue('')}
              />
            )
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '180px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }} />

        <SelectMode />

        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color:'white' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <Badge variant="dot" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color:'white' }}/>
          </Badge>
        </Tooltip>

        <Profile/>
      </Box>
    </Box>
  )
}

export default AppBar
