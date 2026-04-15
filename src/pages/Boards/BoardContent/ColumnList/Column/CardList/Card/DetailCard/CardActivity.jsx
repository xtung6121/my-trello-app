import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline'

const CardActivity = ({ currentMode, trelloButtonStyles }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ViewTimelineIcon sx={{ color: 'text.secondary' }} />
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Activity</Typography>
                </Box>
                <Button variant="contained" sx={trelloButtonStyles}>Hide Details</Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar alt="Current User" src="https://mui.com/static/images/avatar/3.jpg" sx={{ width: 32, height: 32 }} />
                <TextField
                    placeholder="Write a comment..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 4,
                            bgcolor: currentMode === 'dark' ? '#2f3542' : '#fff'
                        }
                    }}
                />
            </Box>
        </Box>
    )
}

export default CardActivity
