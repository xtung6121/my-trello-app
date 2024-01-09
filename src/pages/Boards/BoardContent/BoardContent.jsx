import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

import { mapOrder } from '~/utils/sorts'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import {
  DndContext,
  // PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core'

function BoardContent({ board }) {

  // const pointerSensor = useSensor(PointerSensor,
  //   // Require the mouse to move by 10 pixels before activating
  //   { activationConstraint: { distance: 10 } })

  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợ click bị gọi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor,
    // Press delay of 250ms, with tolerance of 5px of movement, nhẫn giữ khoảng 250 và di chuyển độ chênh lệnh 5px
    { activationConstraint: { delay: 250, tolerance: 500 } })

  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderdColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (e) => {
    // console.log('handleDragEnd:', e)
    const { active, over } = e

    // Nếu không tồn tại over return luôn
    if (!over) return

    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      // Lấy vị trí cũ (từ thằng active)
      const oldIndex = orderdColumns.findIndex(c => c._id === active.id)
      // Lấy vị trí mới (từ thằng over)
      const newIndex = orderdColumns.findIndex(c => c._id === over.id)

      // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
      const dndOrderedColumns = arrayMove(orderdColumns, oldIndex, newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumns', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)

      // Cập nhật lại state ban đầu sau khi kéo thả
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
        <ListColumns columns= {orderdColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
