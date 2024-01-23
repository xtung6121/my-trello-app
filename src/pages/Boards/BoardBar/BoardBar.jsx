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
import { capitalizeFirstLetter } from '~/utils/fomatter'

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
    <Box sx ={{
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
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label={board?.title}
          onClick = {() => {}}/>
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          onClick = {() => {}}/>
        <Chip sx={MENU_STYLE} icon={<AddToDriveIcon />} label="Add to Google Drive" onClick = {() => {}}/>
        <Chip sx={MENU_STYLE} icon={<BoltIcon />} label="Automation" onClick = {() => {}}/>
        <Chip sx={MENU_STYLE} icon={<FilterListIcon />} label="Filter" onClick = {() => {}}/>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        <Button variant="outlined"
          sx={{ borderColor: 'white', color:'white', '&:hover': { borderColor: 'white' } }}
          startIcon={<PersonAddIcon/>}>
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
          <Tooltip title="Xuan Tung">
            <Avatar alt="XuanTung" src="" />
          </Tooltip>
          <Tooltip title="Diem Thi">
            <Avatar alt="DiemThi" src="" />
          </Tooltip>
          <Tooltip title="AnhDung">
            <Avatar alt="AnhDung" src="" />
          </Tooltip>
          <Tooltip title="DaoQuang">
            <Avatar alt="DaoQuang" src="" />
          </Tooltip>
          <Tooltip title="ViNhan">
            <Avatar alt="ViNhan" src="" />
          </Tooltip>
          <Tooltip title="Diem Thi">
            <Avatar alt="DiemThi" src="" />
          </Tooltip>
          <Tooltip title="Diem Thi">
            <Avatar alt="DiemThi" src="" />
          </Tooltip>
        </AvatarGroup>
      </Box>

    </Box>
  )
}

export default BoardBar
