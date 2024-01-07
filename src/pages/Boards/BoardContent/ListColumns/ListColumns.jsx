import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'


function ListColumns() {
  return (
    <Box sx={{
      bgcolor: 'inherit', // kế thừa background của thằng cha
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden'
    }}>
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />

      {/* Add new column */}
      <Box sx={{
        m: 1,
        minWidth: '200px',
        maxWidth: '200px',
        borderRadius: '6px',
        bgcolor: '#ffffff3d',
        height: 'fit-content'
      }}>
        <Button
          startIcon={<AddCircleIcon/>}
          sx={{
            py: 1,
            pl: 2.5,
            width: '100%',
            color: 'white',
            justifyContent: 'flex-start'
          }}>
            Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns