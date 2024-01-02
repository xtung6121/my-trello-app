import Box from '@mui/material/Box'
import SelectMode from '../../components/ModeSelect'


function AppBar() {
  return (
    <Box sx ={{
      height: (theme) => theme.trello.appBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'primary.light'
    }}>
      <SelectMode/>
    </Box>
)
}

export default AppBar
