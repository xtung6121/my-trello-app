import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useTheme, useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// Icons
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CloseIcon from '@mui/icons-material/Close'

// Components
import CardMeta from './CardMeta'
import CardDescription from './CardDescription'
import CardChecklist from './CardChecklist'
import CardActivity from './CardActivity'
import CardSidebar from './CardSidebar'

const DetailCard = ({ open, handleClose, card, updateCardDetails }) => {
    const { mode, systemMode } = useColorScheme()
    const currentMode = mode === 'system' ? systemMode : mode
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    const [title, setTitle] = useState(card?.title || '')

    useEffect(() => {
        setTitle(card?.title || '')
    }, [card?.title])

    const handleSave = () => {
        if (updateCardDetails) {
            updateCardDetails(card._id, { title })
        }
        handleClose()
    }

    const trelloButtonStyles = {
        bgcolor: currentMode === 'dark' ? '#2f3542' : '#091e420f',
        color: currentMode === 'dark' ? '#ffffff' : '#172b4d',
        boxShadow: 'none',
        textTransform: 'none',
        fontWeight: 'bold',
        '&:hover': { bgcolor: currentMode === 'dark' ? '#57606f' : '#091e4224', boxShadow: 'none' }
    }

    return (
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'text.secondary' }}>
                <CloseIcon />
            </IconButton>

            <DialogTitle sx={{ pb: 1, pt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CreditCardIcon sx={{ color: 'text.secondary' }} />
                    <TextField
                        variant="standard"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => updateCardDetails(card._id, { title })}
                        fullWidth
                        InputProps={{
                            disableUnderline: true,
                            sx: { fontSize: '1.25rem', fontWeight: 'bold' }
                        }}
                    />
                </Box>
                <Typography variant="body2" sx={{ ml: { xs: 0, sm: 5 }, color: 'text.secondary' }}>
                    in list <Typography component="span" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>Upcoming</Typography>
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, pt: 1 }}>
                <Box sx={{ width: { xs: '100%', sm: '70%' }, pt: 2 }}>
                    <CardMeta trelloButtonStyles={trelloButtonStyles} />
                    
                    <CardDescription card={card} trelloButtonStyles={trelloButtonStyles} />

                    <CardChecklist 
                        card={card} 
                        updateCardDetails={updateCardDetails} 
                        trelloButtonStyles={trelloButtonStyles} 
                        currentMode={currentMode} 
                    />

                    <CardActivity 
                        currentMode={currentMode} 
                        trelloButtonStyles={trelloButtonStyles} 
                    />
                </Box>

                <CardSidebar trelloButtonStyles={trelloButtonStyles} handleSave={handleSave} />
            </DialogContent>
        </Dialog>
    )
}

export default DetailCard