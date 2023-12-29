import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import WarningIcon from '@mui/icons-material/Warning';
import Typography from '@mui/material/Typography';

const Application1 = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MainCard style={{ backgroundColor: '#fff8e1', width: '300px', height: '200px', padding: '20px', position: 'relative', border: '2px solid #f3de9a' }}>

                <WarningIcon style={{ color: '#ffc107', fontSize: '55px', marginLeft: '6rem', marginTop: '1rem' }} />
                <br />
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginLeft: '3rem' }}>
                    Waiting for HR Approval
                </Typography>
            </MainCard>
        </div>
    )
}

export default Application1
