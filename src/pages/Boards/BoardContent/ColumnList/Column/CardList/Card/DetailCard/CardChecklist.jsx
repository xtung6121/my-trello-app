import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'
import TextField from '@mui/material/TextField'
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined'
import debounce from 'lodash/debounce'

const CardChecklist = ({ card, updateCardDetails, trelloButtonStyles, currentMode }) => {
    const [checklist, setChecklist] = useState(card?.checklist || [])
    const [isAdding, setIsAdding] = useState(false)
    const [newItemText, setNewItemText] = useState('')

    // Vị trí đặt ở chính xác nơi bạn đang để:
    const debouncedUpdate = useCallback(
        debounce((cardId, data) => {
            updateCardDetails(cardId, data)
        }, 500),
        [updateCardDetails] // cập nhật lại hàm debounce nếu prop updateCardDetails thay đổi
    )

    // Cập nhật lại list ở state khi card thay đổi
    useEffect(() => {
        setChecklist(card?.checklist || [])
    }, [card?.checklist])

    const handleAddItem = () => {
        if (!newItemText.trim()) {
            setIsAdding(false)
            return
        }
        const newChecklist = [...checklist, { id: Date.now().toString(), text: newItemText.trim(), isCompleted: false }]
        setChecklist(newChecklist)
        debouncedUpdate(card._id, { checklist: newChecklist })
        setNewItemText('')
        setIsAdding(false)
    }

    const handleToggle = (id) => {
        const newList = checklist.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item)
        setChecklist(newList)
        debouncedUpdate(card._id, { checklist: newList })
    }

    const completedCount = checklist.filter(item => item.isCompleted).length
    const progress = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0

    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckBoxIcon sx={{ color: 'text.secondary' }} />
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Checklist</Typography>
                </Box>
                <Button variant="contained" sx={trelloButtonStyles}>Delete</Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: { xs: 0, sm: 5 }, gap: 2 }}>
                <Typography variant="caption" sx={{ width: 35 }}>{progress}%</Typography>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        flexGrow: 1,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: currentMode === 'dark' ? '#2f3542' : '#091e420f',
                        '& .MuiLinearProgress-bar': {
                            bgcolor: progress === 100 ? '#1f845a' : '#579dff'
                        }
                    }}
                />
            </Box>

            {checklist.map((item) => (
                <Box key={item.id} sx={{ ml: { xs: 0, sm: 5 }, display: 'flex', flexDirection: 'column', gap: 1.5, mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <input
                            type="checkbox"
                            checked={item.isCompleted || false}
                            onChange={() => handleToggle(item.id)}
                            style={{ width: 16, height: 16, cursor: 'pointer' }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                textDecoration: item.isCompleted ? 'line-through' : 'none',
                                color: item.isCompleted ? 'text.secondary' : 'text.primary'
                            }}
                        >
                            {item.title || item.text}
                        </Typography>
                    </Box>
                </Box>
            ))}

            {isAdding ? (
                <Box sx={{ ml: { xs: 0, sm: 5 }, mt: 1 }}>
                    <TextField
                        autoFocus
                        fullWidth
                        size="small"
                        placeholder="Add an item"
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddItem()
                            if (e.key === 'Escape') setIsAdding(false)
                        }}
                        sx={{ mb: 1 }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" color="primary" onClick={handleAddItem}>
                            Add
                        </Button>
                        <Button variant="text" color="inherit" onClick={() => setIsAdding(false)}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Button variant="contained" onClick={() => setIsAdding(true)} sx={{ mt: 1, ml: { xs: 0, sm: 5 }, alignSelf: 'flex-start', ...trelloButtonStyles }}>
                    Add an item
                </Button>
            )}
        </Box>
    )
}

export default CardChecklist
