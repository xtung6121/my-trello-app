import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material/'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
        overflow: 'unset' }}>
        <CardContent sx={{ '&last-child':{ p: 1.5 }, p: 1.5 }}>
          <Typography>Card test 02</Typography>
        </CardContent>

      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
      overflow: 'unset' }}>
      <CardMedia
        sx={{
          height: 140,
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
        }}
        image="https://www.hanoistudio.vn/wp-content/uploads/2021/05/cach-tao-dang-chup-anh-lung-linh-voi-nang-6.jpeg"
        title="green iguana"
      />
      <CardContent sx={{ '&last-child':{ p: 1.5 }, p: 1.5 }}>
        <Typography>Xuân Tùng</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small"> {<GroupIcon/>}20</Button>
        <Button size="small"> {<CommentIcon/>}15</Button>
        <Button size="small"> {<AttachmentIcon/>}1</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card