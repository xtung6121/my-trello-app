import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material/'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'


function Card({ card }) {

  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }

  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
      overflow: 'unset' }}>

      {card?.cover &&
      <CardMedia
        sx={{
          height: 140,
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
        }} image={card?.cover} title={card.description}
      />}

      <CardContent sx={{ '&last-child':{ p: 1.5 }, p: 1.5 }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActions() &&
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        {!!card?.memberIds?.length &&
      <Button size="small">{<GroupIcon/>}{card?.memberIds?.length}</Button>}

        {!!card?.comments?.length &&
      <Button size="small">
        {<CommentIcon/>}{card?.comments?.length}
      </Button>}

        {!!card?.attachments?.length &&
      <Button size="small">
        {<AttachmentIcon/>}{card?.attachments?.length}
      </Button>}
      </CardActions>}
    </MuiCard>
  )
}

export default Card