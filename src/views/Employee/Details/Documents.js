import { Grid } from '@mui/material';
import React, { useState } from 'react';
import FileUpload from 'react-material-file-upload';



const Documents = () => {
    const [files, setFiles] = useState([]);
    const [files1, setFiles1] = useState([]);
    const [files2, setFiles2] = useState([]);
    const [files3, setFiles3] = useState([]);
    const [files4, setFiles4] = useState([]);
    const [files5, setFiles5] = useState([]);
    const [files6, setFiles6] = useState([]);
    const [files7, setFiles7] = useState([]);
    const [files8, setFiles8] = useState([]);
    const [files9, setFiles9] = useState([]);
    const [files10, setFiles10] = useState([]);
    const [files11, setFiles11] = useState([]);
    const [files12, setFiles12] = useState([]);
    const [files13, setFiles13] = useState([]);
    const [files14, setFiles14] = useState([]);
    const [files15, setFiles15] = useState([]);



    

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        // Add your validation logic here
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const image = new Image();
            image.src = URL.createObjectURL(selectedFile);

            image.onload = () => {
                const width = image.width;
                const height = image.height;

                // Passport size photo dimensions (example: 2 inches by 2 inches)
                const passportWidth = 2 * 300; // 300 pixels per inch
                const passportHeight = 2 * 300;

                if (width === passportWidth && height === passportHeight) {
                    setFile(selectedFile);
                } else {
                    alert('Please select a passport size photo with dimensions 2 inches by 2 inches.');
                }
            };
        } else {
            alert('Please select a valid image file.');
        }
    };


    return (
        <div style={{ marginBottom: '10px', marginTop: '20px', }}>
            <Grid container spacing={2}>
                <Grid xs={12} p={6} style={{marginLeft:'555px'}}>
                    <label htmlFor="photoInput">Select Passport Size Photo:</label>
                    <input
                        type="file"
                        id="photoInput"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <button onClick={() => document.getElementById('photoInput').click()}>Browse</button>

                    {file && (
                        <div>
                            <h4>Selected Photo:</h4>
                            <img src={URL.createObjectURL(file)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </div>
                    )}
                    {!file && <p>No photo selected.</p>}
                </Grid>
                <Grid xs={4} p={2}>
                    <FileUpload
                        title='Copy of CV'
                        value={files}
                        onChange={setFiles}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    /></Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Academic testimonals (10th, 12th, Graduation)'
                        value={files1}
                        onChange={setFiles1}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    /></Grid>

                <Grid xs={4} p={2}>
                    <FileUpload
                        title='Technical Certifications (If Any)'
                        value={files2}
                        onChange={setFiles2}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Identity Proof/PAN Card/Adhaar Card'
                        value={files3}
                        onChange={setFiles3}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Residence Proof'
                        value={files4}
                        onChange={setFiles4}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Certified Copy Of Resignation Letter'
                        value={files5}
                        onChange={setFiles5}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid xs={4} p={2}>
                    <FileUpload
                        title='Last 3 Months Salary Slips Of The Previous Organization'
                        value={files6}
                        onChange={setFiles6}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Clearance Letter/Relieving Letter From The Previous Organization'
                        value={files7}
                        onChange={setFiles7}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Previous Organizations Experience Certificates'
                        value={files8}
                        onChange={setFiles8}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Contact No Of Immediate Supervisor In Last Company'
                        value={files9}
                        onChange={setFiles9}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Tax Declaration Form'
                        value={files10}
                        onChange={setFiles10}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Passport/Visa'
                        value={files11}
                        onChange={setFiles11}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Bank Pass Book'
                        value={files12}
                        onChange={setFiles12}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Form 16 From Last EMployer'
                        value={files13}
                        onChange={setFiles13}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='UAN-NO/PF Card'
                        value={files14}
                        onChange={setFiles14}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
                <Grid  xs={4} p={2}>
                    <FileUpload
                        title='Driving License Front & Back'
                        value={files15}
                        onChange={setFiles15}
                        multiFile={false}
                        leftLabel="or"
                        rightLabel="to select files"
                        buttonLabel="click here"
                        buttonRemoveLabel="Remove all"
                        maxFileSize={10}
                        maxUploadFiles={1}
                        bannerProps={{ elevation: 0, variant: "outlined" }}
                        containerProps={{ elevation: 0, variant: "outlined" }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Documents
