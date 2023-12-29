import Button from '@mui/material/Button'
import AbcIcon from '@mui/icons-material/Abc'
import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'


function App() {

  return (
    <>
      <div>XuanTung</div>
      <Button variant="text">Hello world</Button>
      <Button variant="contained">Text</Button>
      <Button variant="outlined">UI Button</Button>
      <AbcIcon></AbcIcon>

      <br></br>
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />

    </>
  )
}

export default App
