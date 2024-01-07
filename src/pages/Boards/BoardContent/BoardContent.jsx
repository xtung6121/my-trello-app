import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'


function BoardContent() {
  return (
    <Box sx ={{
      p: '10px 0',
      width: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '*::-webkit-scrollbar-track': { m: 2 },
      height: (theme) => theme.trello.boardContentHeight,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#3498db')
    }}>
      <ListColumns />
    </Box>
  )
}

export default BoardContent
