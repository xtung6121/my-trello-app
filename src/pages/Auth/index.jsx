import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// import React from 'react'


function index() {

  return (

    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      bgcolor: '#f1f1f1',
      minHeight: '100vh'
    }}>
      <Box
        sx={{
          gap: 2,
          width: '350px',
          bgcolor: '#95a5a6',
          margin: 4,
          minHeight: '100px',
          borderRadius: '5px',
          alignSelf: 'center',
          display: 'flex',
          flexDirection: 'column'
        }} >
        <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }} variant="span">Login</Typography>
        <TextField
          sx={{
            m: 2,
            width: '300px'
          }}
          id="outlined"
          label="Email"
          type="email"
          defaultValue=""
          // value={email}
          // onChange={this.handleChange}
        />
        <TextField
          sx={{
            m: 2,
            width: '300px'

          }}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          // value={password}
          // onChange={this.handleChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button sx={{ m: 2 }} type='submit' Button variant="contained">Submit</Button>
        </Box>
      </Box>

    </Box>
  )
}

export default index