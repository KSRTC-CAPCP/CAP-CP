import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';


const Application2 = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MainCard style={{ backgroundColor: '#b9f6ca', width: '300px', height: '200px', padding: '20px', position: 'relative', border: '2px solid #94ebac' }}>

                <CheckCircleIcon style={{ color: '#00c853', fontSize: '55px', marginLeft: '6rem', marginTop: '1rem' }} />
                <br />
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginLeft: '2rem' }}>
                   Verification Approved Successfully
                </Typography>
                <br/>
                <Typography variant="h6" style={{ marginLeft: '1rem' }}>If You want any Updation or Modification contact your HR.</Typography>
            </MainCard>
        </div>
    )
}

export default Application2
