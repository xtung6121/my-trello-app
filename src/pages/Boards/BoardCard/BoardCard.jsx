/* src/pages/Boards/BoardCard.jsx */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import StarBorderIcon from '@mui/icons-material/StarBorder'

function BoardCard({ board, gradientClass, onClick }) {
  return (
    <Box
      className={`board-card ${gradientClass}`}
      onClick={() => onClick(board._id)}
    >
      <Typography className="board-card-title">
        {board.title}
      </Typography>

      <Box className="board-card-star">
        <StarBorderIcon fontSize="small" />
      </Box>
    </Box>
  )
}

export default BoardCard
