import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

function BoardBar({ board }) {

  const MENU_STYLE = {
    color: 'white',
    padding: '5px',
    bgcolor: 'transparent',
    border: ' none',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
      color: 'white'
    },
    '&:hover': {
      bgcolor: 'primary.50'
    }
  }
  return (
    <Box sx={{
      height: (theme) => theme.trello.boardBarHeight,
      gap: 2,
      paddingX: 2,
      width: '100%',
      display: 'flex',
      overflowX: 'auto',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #70a1ff',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#3498db')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLE}
            icon={<DashboardIcon />}
            label={board?.title}
            onClick={() => { }} />
        </Tooltip>
        <Tooltip title={board?.type}>
          <Chip
            sx={MENU_STYLE}
            icon={<VpnLockIcon />}
            label={capitalizeFirstLetter(board?.type)}
            onClick={() => { }} />
        </Tooltip>
        <Tooltip title="Add to Google Drive">
          <Chip sx={MENU_STYLE} icon={<AddToDriveIcon />} label="Add to Google Drive" onClick={() => { }} />
        </Tooltip>
        <Tooltip title="Automation">
          <Chip sx={MENU_STYLE} icon={<BoltIcon />} label="Automation" onClick={() => { }} />
        </Tooltip>
        <Tooltip title="Filter">
          <Chip sx={MENU_STYLE} icon={<FilterListIcon />} label="Filter" onClick={() => { }} />
        </Tooltip>

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        <Button variant="outlined"
          sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white' } }}
          startIcon={<PersonAddIcon />}>
          Invite</Button>

        <AvatarGroup
          max={5}
          sx={{
            gap: '9px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Avatar title="Xuan Tung" alt="XuanTung" src="" />
        </AvatarGroup>
      </Box>

    </Box>
  )
}

export default BoardBar
