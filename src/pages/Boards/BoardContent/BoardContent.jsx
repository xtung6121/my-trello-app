import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

import { mapOrder } from '~/utils/sorts'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

// xử lý dữ liệu xử lý mảng,...
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceHolderCard } from '~/utils/fomatter'

import {
  DndContext,
  // PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'


const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {

  // const pointerSensor = useSensor(PointerSensor,
  //   // Require the mouse to move by 10 pixels before activating
  //   { activationConstraint: { distance: 10 } })

  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor,
    // Press delay of 250ms, with tolerance of 5px of movement, nhẫn giữ khoảng 250 và di chuyển độ chênh lệnh 5px
    { activationConstraint: { delay: 250, tolerance: 500 } })

  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderdColumns, setOrderedColumns] = useState([])


  // cùng một thời điểm chỉ có một phần tử được kéo (col or card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])


  // Tìm một cái Column theo CardId
  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver chúng ta
    // sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới.
    return orderdColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Function chung xử lý việc cập nhật lại state trong trường hợp di chuyển Card giữa các Column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      // Tìm vị trí (index) của cái overCard trong column dích (nơi mà active Card sắp được thả)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      // Logic tính toán "cardIndex mới" (trên hoặc dưới của overCard) lấy chuẩn ra từ code của thư viện dnd-kit
      let newCardIndex
      /*Biến isBelowOverItem được gán giá trị dựa trên biểu thức active.rect.current.translated.top > over.rect.top + over.rect.height.
      Nó kiểm tra xem vị trí trên cùng của activeCard có nằm dưới vị trí dưới cùng của overCard hay không */
      const isBelowOverItem =
      active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
      // console.log('newCardIndex:', newCardIndex)
      // Clone mảng OderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OderedColumnsState mới
      const nextColumns = cloneDeep(prevColumns) // sao chép dữ liệu nông

      // Lý do không dùng activeColumn và Overcolumn là bởi vì muốn clone dữ liệu mới hoàn toàn và không đụng đến
      // dữ liệu đã có ở đoạn code trên
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id )

      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id )

      // Column cũ kéo thả card
      if (nextActiveColumn) {
        // Xóa card ở cái column active (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang
        // column khác )
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Thêm PlaceHolderCard nếu column rỗng: Bị kéo hết card đi không còn cái nào nữa.
        if (isEmpty(nextActiveColumn.cards)) {
          // console.log('Card cuối cùng bị kéo đi')
          nextActiveColumn.cards = [generatePlaceHolderCard(nextActiveColumn)]
        }

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      // Column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có thì cần xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        /* Đối với trường hợp dragEnd thì phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi
        kéo khỏi card giữa 2 column khác nhau */
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextActiveColumn._id
        }
        // Tiếp theo thêm card đang kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        nextActiveColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)
        // Cập nhật lại mảng CardOrder cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      return nextColumns
    })
  }

  // Trigger khi bắt đầu hành động kéo một phần tử
  const handleDragStart = (e) => {
    // console.log('handleDragStart:', e)
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(e?.active?.data?.current)

    // Nếu là kéo card thì mới thực hiện hành động set giá trị old Column
    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id))
    }
  }


  // Trigger trong quá trình kéo (drag) một phần tử
  const handleDragOver = (e) => {
    // console.log('handleDragOver:', e)
    const { active, over } = e

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    if (!active || !over) return


    // activeDraggingCard là cái card được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

    // overCard: là cái card đang tương tác trên hoặc dưới so với cái card được kéo ở trên
    const { id: overCardId } = over


    // Tìm 2 column theo card id

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không tồn tại 1 trong 2 column thì không làm gì hết tránh crash trang web
    if (!activeColumn || !overColumn) return

    // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
    // Vì đây đang là đoạn xử lý lúc kéo (handleDragOver), còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác ở handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData
      )
    }

  }
  // console.log('activeDragItemId:', activeDragItemId)
  // console.log('activeDragItemType:', activeDragItemType)
  // console.log('activeDragItemData:', activeDragItemData)

  // Trigger khi kết thúc hành động kéo một phần tử
  const handleDragEnd = (e) => {
    // console.log('handleDragEnd:', e)
    const { active, over } = e
    // Nếu không tồn tại over return luôn
    if (!over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCard là cái card được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

      // overCard: là cái card đang tương tác trên hoặc dưới so với cái card được kéo ở trên
      const { id: overCardId } = over


      // Tìm 2 column theo card id

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Nếu không tồn tại 1 trong 2 column thì không làm gì hết tránh crash trang web
      if (!activeColumn || !overColumn) return

      // còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác ở handleDragEnd
      // console.log('oldColumnWhenDraggingCard:', oldColumnWhenDraggingCard)
      // console.log('overColumn:', overColumn)
      // console.log('activeDragItemData:', activeDragItemData)

      /* Hành động kéo thả card giữa hai column khác nhau
      Phải dùng đến activeDragItemData hoặc oldColumnWhenDraggingCard
      (set vào state từ bước handleDragStart) chứ không phải activeData
      trong scope handleDragEnd này
      vì sau khi đi qua onDragOver tới đây state của card đã bị cập nhật 1 lần rồi
      */
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData
        )
      } else {
        // console.log('Hành dộng kéo thả card trong cùng một column!')
        // Lấy vị trí cũ (từ thằng oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        // Lấy vị trí mới (từ thằng over)
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        setOrderedColumns(prevColumns => {
          /* Clone mảng OrderedColumnState cũ ra một cái mới để xử lý data rồi return - cập nhật lại
          điều này đảm bảo không thay đổi trực tiếp mảng gốc*/
          const nextColumns = cloneDeep(prevColumns)

          // Tìm cái column mà chúng ta thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // Cập nhật lại 2 giá trị mới là card và cardOderIds, trong cái target column
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          // console.log('targetColumn', targetColumn)

          // Trả về state mới chuẩn vị trí
          return nextColumns
        })
      }
    }

    // XỬ LÝ KÉO THẢ COLUMNs
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // console.log('Hành động kéo thả Columns!')
      // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
      if (active.id !== over.id) {
        // Lấy vị trí cũ (từ thằng active)
        const oldColumnIndex = orderdColumns.findIndex(c => c._id === active.id)
        // Lấy vị trí mới (từ thằng over)
        const newColumnIndex = orderdColumns.findIndex(c => c._id === over.id)

        // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
        const dndOrderedColumns = arrayMove(orderdColumns, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log('dndOrderedColumns', dndOrderedColumns)
        // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)

        // Cập nhật lại state ban đầu sau khi kéo thả
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // Những dữ liệu sau khi kéo thả luôn trả về dữ liệu null mặc định ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)

  }

  // Animation khi thả (Drop) phần tử - Test bằng cách kéo xong rồi tạo trực tiếp và nhìn vào phần giữ chỗ Overplay
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  return (
    <DndContext
      // Cảm biến
      sensors={sensors}

      // Thuật toán phát hiện va chạm (nếu không có nó thì card với cover lớn hơn sẽ không kéo qua Column được vì lúc này đang bị conflict giữa card và column)
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
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
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
