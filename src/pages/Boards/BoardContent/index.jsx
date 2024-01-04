import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx ={{
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      width: '100%',
      display: 'flex',
      bgcolor: (theme) =>
        (theme.palette.mode === 'dark' ? '#34495e' : '#3498db')
    }}>
      {/* Box column */}
      <Box
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) =>
            (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          wl: 2,
          borderRadius: '6px'
        }}>
        <Box>
          Header
        </Box>
        <Box
          sx={{}}>
            List
        </Box>
        <Box
          sx={{}}>
            Footer
        </Box>

      </Box>
    </Box>
  )
}

export default BoardContent
