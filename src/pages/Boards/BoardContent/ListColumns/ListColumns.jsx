import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'


function ListColumns({ columns }) {
  /* SortableContext yêu cầu item là một mảng dạng ['id-1', 'id-2'] chứ không phải dạng [{id:'id-1'}, {id: 'id-2'}]
  Nếu không đúng thì vẫn kéo thả được nhưng không có animation
*/
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit', // kế thừa background của thằng cha
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}>
        {columns?.map(column => <Column key={column._id} column= {column}/>)}
        {/* <Column /> */}


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
    </SortableContext>
  )
}

export default ListColumns