import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { fetchBoardDetailsAPI } from '~/apis'
import { useEffect, useState } from 'react'


function Boards() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // Tạm thời fix cứng boardId, flow chuẩn chỉnh về sau sử dụng react-router-dom để lấy chuẩn boardId từ URL về
    const boardId = '6603e5f4d0d6aa84f86bfed4'

    // Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar/>
        <BoardBar board ={board}/>
        <BoardContent board = {board}/>
      </Container>
    </>
  )
}

export default Boards
