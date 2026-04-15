import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

const CardMeta = ({ trelloButtonStyles }) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 4, ml: { xs: 0, sm: 5 } }}>
            <Box>
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>MEMBERS</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem' } }}>
                        <Avatar alt="Member 1" src="https://mui.com/static/images/avatar/1.jpg" />
                        <Avatar alt="Member 2" src="https://mui.com/static/images/avatar/2.jpg" />
                    </AvatarGroup>
                    <Button variant="contained" sx={{ minWidth: 32, width: 32, height: 32, p: 0, borderRadius: '50%', ...trelloButtonStyles }}>
                        +
                    </Button>
                </Box>
            </Box>
            <Box>
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>LABELS</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Chip label="Marketing" size="small" sx={{ bgcolor: '#f5cd47', color: '#172b4d', fontWeight: 'bold', borderRadius: 1, height: 32, px: 1 }} />
                    <Button variant="contained" sx={{ minWidth: 32, width: 32, height: 32, p: 0, borderRadius: 1, ...trelloButtonStyles }}>
                        +
                    </Button>
                </Box>
            </Box>
            <Box>
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>DUE DATE</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Button variant="contained" endIcon={<Typography sx={{ fontSize: '10px' }}>▼</Typography>} sx={{ borderRadius: 1, ...trelloButtonStyles }}>
                        Sep 21 at 12:38 AM
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CardMeta
