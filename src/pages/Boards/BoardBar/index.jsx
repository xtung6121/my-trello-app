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

function BoardBar() {
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
    <Box sx ={{
      height: (theme) => theme.trello.boardBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      paddingX: 2,
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      borderBottom: '1px solid #70a1ff',
      bgcolor: (theme) =>
        (theme.palette.mode === 'dark' ? '#34495e' : '#3498db')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip sx={MENU_STYLE} icon={<DashboardIcon />} label="XuanTung HCMUNRE"
          onClick = {() => {
          }}/>
        <Chip sx={MENU_STYLE} icon={<VpnLockIcon />} label="Public/Private Workspace"
          onClick = {() => {
          }}/>
        <Chip sx={MENU_STYLE} icon={<AddToDriveIcon />} label="Add to Google Drive"
          onClick = {() => {
          }}/>
        <Chip sx={MENU_STYLE} icon={<BoltIcon />} label="Automation"
          onClick = {() => {
          }}/>
        <Chip sx={MENU_STYLE} icon={<FilterListIcon />} label="Filter"
          onClick = {() => {
          }}/>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        <Button variant="outlined"
          sx={{ borderColor: 'white', color:'white', '&:hover': { borderColor: 'white' } }}
          startIcon={<PersonAddIcon/>}>
          Invite</Button>

        <AvatarGroup
          max={4}
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
          <Tooltip title="Xuan Tung">
            <Avatar alt="XuanTung" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Xuan Tung">
            <Avatar alt="XuanTung" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Xuan Tung">
            <Avatar alt="XuanTung" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Xuan Tung">
            <Avatar alt="XuanTung" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="Xuan Tung">
            <Avatar alt="XuanTung" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>

    </Box>
  )
}

export default BoardBar
