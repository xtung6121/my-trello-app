import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function BoardContent() {
  const COLUMN_HEADER_HEIGHT = '50px'
  const COLUMN_FOOTER_HEIGHT = '56px'
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
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

      <Box sx={{
        bgcolor: 'inherit', // kế thừa background của thằng cha
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}>
        {/* Box column 1*/}
        <Box
          sx={{
            m: 1,
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) =>
              (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            wl: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}>
          {/* Box header column */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <Typography variant='h6' sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Column Title
            </Typography>

            <Tooltip title="More Option">
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-button-menu-column-dropdown"
                aria-controls={open ? 'basic-menu-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}/>
            </Tooltip>
            <Menu
              id="basic-button-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-menu-column-dropdown'
              }}>
              <MenuItem>
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Achieve this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

          {/* Box list card */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(
                ${theme.trello.boardContentHeight} 
                - ${theme.spacing(5)}
                - ${COLUMN_HEADER_HEIGHT}
                - ${COLUMN_FOOTER_HEIGHT})`,
              '&::-webkit-scrollbar-thumb': { background: '#ced0da' },
              '&::-webkit-scrollbar-thumb:hover': { background: '#bfc2cf' }
            }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
              overflow: 'unset' }}>
              <CardMedia
                sx={{
                  height: 140,
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
                }}
                image="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-28.jpg"
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
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
              overflow: 'unset' }}>
              <CardContent sx={{ '&last-child':{ p: 1.5 }, p: 1.5 }}>
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
              overflow: 'unset' }}>
              <CardContent sx={{ '&last-child':{ p: 1.5 }, p: 1.5 }}>
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
              overflow: 'unset' }}>
              <CardContent sx={{ '&last-child':{ p: 1.5 }, p: 1.5 }}>
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
              overflow: 'unset' }}>
              <CardContent sx={{ '&last-child':{ p: 1.5 }, p: 1.5 }}>
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
              overflow: 'unset' }}>
              <CardContent sx={{ '&last-child':{ p: 1.5 }, p: 1.5 }}>
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>

          </Box>

          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'

            }}>
            <Button>{<AddCardIcon/>}Add new card</Button>
            <Tooltip title="Drag to move"><DragHandleIcon sx={{ cursor:'pointer' }}/></Tooltip>
          </Box>

        </Box>

        {/* Box column 2*/}
        <Box
          sx={{
            m: 1,
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) =>
              (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
            wl: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}>
          {/* Box header column */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <Typography variant='h6' sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Column Title
            </Typography>

            <Tooltip title="More Option">
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-button-menu-column-dropdown"
                aria-controls={open ? 'basic-menu-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}/>
            </Tooltip>
            <Menu
              id="basic-button-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-menu-column-dropdown'
              }}>
              <MenuItem>
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Achieve this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

          {/* Box list card */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(
                ${theme.trello.boardContentHeight} 
                - ${theme.spacing(5)}
                - ${COLUMN_HEADER_HEIGHT}
                - ${COLUMN_FOOTER_HEIGHT})`,
              '&::-webkit-scrollbar-thumb': { background: '#ced0da' },
              '&::-webkit-scrollbar-thumb:hover': { background: '#bfc2cf' }
            }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
              overflow: 'unset' }}>
              <CardMedia
                sx={{
                  height: 140,
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
                }}
                image="https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-28.jpg"
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
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
              overflow: 'unset' }}>
              <CardContent sx={{ '&last-child':{ p: 1.5 }, p: 1.5 }}>
                <Typography>Card 1</Typography>
              </CardContent>
            </Card>

          </Box>

          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'

            }}>
            <Button>{<AddCardIcon/>}Add new card</Button>
            <Tooltip title="Drag to move"><DragHandleIcon sx={{ cursor:'pointer' }}/></Tooltip>
          </Box>

        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
