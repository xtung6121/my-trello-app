import Board from './pages/Boards/_id'
import { Routes, Route, Navigate } from 'react-router-dom'
import BoardList from './pages/Boards/index'

function App() {
  return (
    <Routes>
      {/* :boardId là tham số động */}
      <Route path="/" element={<Navigate to="/boards" replace />} />
      <Route path="/boards" element={<BoardList />} />
      <Route path="/boards/:boardId" element={<Board />} />
      <Route path="*" element={<h1>404 - Không tìm thấy trang!</h1>} />
    </Routes>
  )
}

export default App

