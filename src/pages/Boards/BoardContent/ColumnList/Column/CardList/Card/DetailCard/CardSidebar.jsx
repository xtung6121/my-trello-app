import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import PersonIcon from '@mui/icons-material/PersonOutline'
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined'
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTimeOutlined'
import AttachmentIcon from '@mui/icons-material/AttachmentOutlined'

const CardSidebar = ({ trelloButtonStyles, handleSave }) => {
    return (
        <Box sx={{ width: { xs: '100%', sm: '30%' }, display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <Box>
                <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', display: 'block', mb: 1 }}>ADD TO CARD</Typography>
                <Button startIcon={<PersonIcon />} fullWidth sx={{ justifyContent: 'flex-start', mb: 1, ...trelloButtonStyles }}>Members</Button>
                <Button startIcon={<LocalOfferIcon />} fullWidth sx={{ justifyContent: 'flex-start', mb: 1, ...trelloButtonStyles }}>Labels</Button>
                <Button startIcon={<CheckBoxIcon />} fullWidth sx={{ justifyContent: 'flex-start', mb: 1, ...trelloButtonStyles }}>Checklist</Button>
                <Button startIcon={<AccessTimeIcon />} fullWidth sx={{ justifyContent: 'flex-start', mb: 1, ...trelloButtonStyles }}>Dates</Button>
                <Button startIcon={<AttachmentIcon />} fullWidth sx={{ justifyContent: 'flex-start', mb: 1, ...trelloButtonStyles }}>Attachment</Button>
            </Box>

            <Box sx={{ mt: 'auto' }}>
                <Button variant="contained" onClick={handleSave} color="primary" fullWidth sx={{ py: 1, fontWeight: 'bold' }}>
                    Update Card Details
                </Button>
            </Box>
        </Box>
    )
}

export default CardSidebar
