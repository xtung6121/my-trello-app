import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SubjectIcon from '@mui/icons-material/Subject'

const CardDescription = ({ card, trelloButtonStyles }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 2 }}>
                <SubjectIcon sx={{ color: 'text.secondary' }} />
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Description</Typography>
                <Button variant="contained" sx={{ ml: 1, ...trelloButtonStyles }}>Edit</Button>
            </Box>
            <Typography variant="body2" sx={{ ml: { xs: 0, sm: 5 }, mb: 1, color: "text.primary", pr: 2 }}>
                {card?.description || 'We need to create a short-term integrated communications plan to generate lead or sales for our T-shirts.'}
            </Typography>
        </Box>
    )
}

export default CardDescription
