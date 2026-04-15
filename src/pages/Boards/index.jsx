// pages/Boards/index.jsx — Trang danh sách boards
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import AppBar from '~/components/AppBar/AppBar'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'
import { fetchBoardsAPI } from '~/apis'
import BoardCard from './BoardCard/BoardCard'
import '~/pages/Boards/BoardList.css'
import { createNewBoardAPI } from '~/apis'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

function BoardList() {
  const [boards, setBoards] = useState([])
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = (e) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateNewBoard = (event) => {
    event.preventDefault()

    // Thu thập dữ liệu từ Dialog Form
    const formData = new FormData(event.currentTarget)
    const newBoardData = {
      title: formData.get('title'),
      description: formData.get('description'),
      type: formData.get('type')
    }

    createNewBoardAPI(newBoardData).then(data => {
      setBoards([...boards, data])
      handleClose() // Tạo thành công thì đóng Dialog lại
    }).catch(error => {
      console.error('Create new board API error:', error)
    })
  }

  useEffect(() => {
    fetchBoardsAPI().then(data => {
      // Đảm bảo data là mảng trước khi set
      if (Array.isArray(data)) {
        setBoards(data)
      } else {
        setBoards([])
        console.error('API return non-array data:', data)
      }
    }).catch(error => {
      console.error('Fetch boards API error:', error)
      setBoards([])
    })
  }, [])

  const SidebarItem = ({ icon: Icon, label, active }) => (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      bgcolor: active ? 'action.selected' : 'transparent',
      color: active ? 'primary.main' : 'text.primary',
      transition: 'all 0.2s',
      '&:hover': {
        bgcolor: active ? 'action.focus' : 'action.hover'
      }
    }}>
      <Icon fontSize="small" />
      <Typography variant="body1" sx={{ fontWeight: active ? 600 : 400 }}>{label}</Typography>
    </Box>
  )

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar />

      <Container maxWidth="lg" sx={{ mt: 5, mb: 10 }}>
        <Box className="boards-layout">
          {/* Sidebar Section */}
          <Box className="boards-sidebar" sx={{ display: { xs: 'none', md: 'block' } }}>
            <Stack spacing={1}>
              <SidebarItem icon={SpaceDashboardIcon} label="Boards" active />
              <SidebarItem icon={HomeIcon} label="Home" />
              <SidebarItem icon={ListAltIcon} label="Templates" />
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2" sx={{ px: 1.5, mb: 1.5, color: 'text.secondary', fontWeight: 600 }}>
              Workspaces
            </Typography>
            <SidebarItem icon={SpaceDashboardIcon} label="My Workspace" />
          </Box>

          {/* Main Content Section */}
          <Box className="boards-main">
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, fontWeight: 700, color: 'text.primary' }}>
              <SpaceDashboardIcon /> Your Boards
            </Typography>

            <Grid container spacing={3}>
              {/* Board Cards */}
              {boards.map((board, index) => (
                <Grid item xs={12} sm={6} md={4} key={board._id || index}>
                  <BoardCard
                    board={board}
                    gradientClass={`gradient-${(index % 6) + 1}`}
                    onClick={(id) => navigate(`/boards/${id}`)}
                  />
                </Grid>
              ))}

              {/* Create New Board Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Box className="create-board-card"
                  onClick={handleOpen}
                >
                  <Stack alignItems="center" spacing={0.5}>
                    <AddIcon fontSize="large" />
                    <Typography
                      sx={{ color: 'text.primary', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Create new board
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            </Grid>

            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
            >
              <form onSubmit={handleCreateNewBoard}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>
                  Create New Board
                </DialogTitle>

                <DialogContent dividers>
                  <Typography sx={{ mb: 2, color: 'text.secondary' }}>
                    Please fill in the details below to create a new board.
                  </Typography>

                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    name="title"
                    label="Board Title"
                    fullWidth
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    required
                    margin="dense"
                    name="description"
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                  />

                  <FormControl required>
                    <FormLabel>Board Type</FormLabel>
                    <RadioGroup row name="type" defaultValue="public">
                      <FormControlLabel value="public" control={<Radio />} label="Public" />
                      <FormControlLabel value="private" control={<Radio />} label="Private" />
                    </RadioGroup>
                  </FormControl>
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" variant="contained">
                    Create
                  </Button>
                </DialogActions>
              </form>
            </Dialog>


          </Box>



        </Box>
      </Container>
    </Box>
  )
}

export default BoardList