/*eslint-disable */
import {
  Avatar,
  Box,
  ButtonBase,
  Button,
  Tooltip,
  IconButton,
  MenuItem,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Typography
} from '@mui/material';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import { IconDownload, IconEdit, IconEye, IconPlus, IconTrash, IconUpload } from '@tabler/icons';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { DeleteRounded, KeyboardBackspaceRounded, ModeEditRounded, VisibilityRounded } from '@mui/icons-material';
import { useState } from 'react';

const columnHelper = createMRTColumnHelper();
const data = [
  {
    id: 1,
    firstName: 'Elenora',
    lastName: 'Wilkinson',
    company: 'Feest - Reilly',
    city: 'Hertaland',
    country: 'Qatar'
  },
  {
    id: 2,
    firstName: 'Berneice',
    lastName: 'Feil',
    company: 'Deckow, Leuschke and Jaskolski',
    city: 'Millcreek',
    country: 'Nepal'
  }
];
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 40
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    size: 120
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    size: 120
  }),
  columnHelper.accessor('company', {
    header: 'Company',
    size: 300
  }),
  columnHelper.accessor('city', {
    header: 'City'
  }),
  columnHelper.accessor('country', {
    header: 'Country',
    size: 220
  })
];

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true
});
const BusinessLeads = () => {
  const [view, setView] = useState({
    visible: false,
    mode: 'Initial' // 'add', 'edit', 'view'
  });
  const theme = useTheme();
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };
  const handleEdit = () => {
    console.log('worked');
    setView({
      visible: true,
      mode: 'Edit'
    });
  };
  const handleView = () => {
    console.log('worked');
    setView({
      visible: true,
      mode: 'View'
    });
  };
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <div style={{ display: 'flex' }}>
        <IconButton onClick={handleEdit}>
          <DeleteRounded style={{ color: '#2196f3' }} />
        </IconButton>
        <IconButton onClick={handleView}>
          <VisibilityRounded style={{ color: '#2196f3' }} />
        </IconButton>
        <IconButton onClick={handleEdit}>
          <ModeEditRounded style={{ color: '#2196f3' }} />
        </IconButton>
      </div>
    ),
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: () => (
      <>
        <div style={{ marginLeft: '0.5rem' }}>
          <Button onClick={handleExportData} variant="outlined" startIcon={<IconUpload />} style={{ marginRight: '1rem' }}>
            Import
          </Button>
          <Button onClick={handleExportData} variant="outlined" startIcon={<IconDownload />}>
            Export
          </Button>
        </div>
      </>
    )
    // renderRowActions: ({ row, table }) => (
    //   <Box sx={{ display: 'flex', gap: '1rem' }}>
    //     <Tooltip title="Edit">
    //       <IconButton onClick={() => table.setEditingRow(row)}>
    //         <IconEdit />
    //       </IconButton>
    //     </Tooltip>
    //     <Tooltip title="Delete">
    //       <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
    //         <IconEdit />
    //       </IconButton>
    //     </Tooltip>
    //   </Box>
    // )
  });
  const editable = useMaterialReactTable({
    columns,
    data: data,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    positionActionsColumn: 'last',
    enableColumnFilters: false,
    enableFilters: false,
    enableDensityToggle: false,
    enablePagination: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => console.log('err'),
    // onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => console.log('err'),
    // onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <ModeEditRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => console.log('del')}>
            <DeleteRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      // <Button
      //   variant="contained"
      //   onClick={() => {
      //     table.setCreatingRow(true);
      //   }}
      // >
      //   Create History
      // </Button>
      <div className="title-bar">
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={() => {
              table.setCreatingRow(true);
            }}
            color="inherit"
          >
            <IconPlus />
          </Avatar>
        </ButtonBase>
      </div>
    )
  });

  const handleToggle = () => {
    setView({
      visible: true,
      mode: 'Add'
    });
  };
  const handleClose = () => {
    setView({
      visible: true,
      mode: 'Initial'
    });
  };
  return (
    <div className="max">
      {view.mode === 'Add' && (
        <MainCard
          title="Leads Creation"
          secondary={
            <Box
              sx={{
                ml: 2,
                // mr: 3,
                [theme.breakpoints.down('md')]: {
                  mr: 2
                }
              }}
            >
              <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                      background: theme.palette.secondary.dark,
                      color: theme.palette.secondary.light
                    }
                  }}
                  aria-haspopup="true"
                  onClick={handleClose}
                  color="inherit"
                >
                  <KeyboardBackspaceRounded stroke={2} size="1.3rem" />
                </Avatar>
              </ButtonBase>
            </Box>
          }
        >
          <Grid container>
            <Grid xs={4} p={2}>
              <TextField fullWidth type="date" variant="outlined" name="dob" className="w-100" />
            </Grid>
            <Grid xs={4} p={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Source</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                  <MenuItem value={'website'}>Website</MenuItem>
                  <MenuItem value={'Expo'}>Expo</MenuItem>
                  <MenuItem value={'Reference'}>Reference</MenuItem>
                  <MenuItem value={'coldcalls'}>Cold Calls</MenuItem>
                  <MenuItem value={'others'}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Pilot" variant="outlined" />
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Company Name" variant="outlined" />
            </Grid>{' '}
            <Grid xs={4} p={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                  <MenuItem value={'website'}>Website</MenuItem>
                  <MenuItem value={'Expo'}>Expo</MenuItem>
                  <MenuItem value={'Reference'}>Reference</MenuItem>
                  <MenuItem value={'coldcalls'}>Cold Calls</MenuItem>
                  <MenuItem value={'others'}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Contact Name" variant="outlined" />
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Department" variant="outlined" />
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Phone Number" variant="outlined" />
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
            </Grid>
            <Grid xs={4} p={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Business Verticle</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                  <MenuItem value={'teardown'}>Tear Down</MenuItem>
                  <MenuItem value={'operations'}>Operations</MenuItem>
                  <MenuItem value={'concerns'}>Concerns</MenuItem>
                  <MenuItem value={'software'}>Software</MenuItem>
                  <MenuItem value={'hr'}>HR</MenuItem>
                  <MenuItem value={'finance'}>Finance</MenuItem>
                  <MenuItem value={'scanning'}>Scanning</MenuItem>
                  <MenuItem value={'Modeling'}>Modeling</MenuItem>
                  <MenuItem value={'drivingunit'}>Driving Unit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth variant="outlined" placeholder="Lead Description" multiline rows={1} maxRows={4} />{' '}
            </Grid>
            <Grid xs={4} p={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="status">
                  <MenuItem value={'newlead'}>New Lead</MenuItem>
                  <MenuItem value={'contactEstablish'}>Contact Establish</MenuItem>
                  <MenuItem value={'technicleMeeting'}>Technicle Meeting</MenuItem>
                  <MenuItem value={'requirementConfirm'}>Requirement Confirm</MenuItem>
                  <MenuItem value={'hold'}>Hold</MenuItem>
                  <MenuItem value={'reject'}>Reject</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" style={{ float: 'right', margin: '2rem' }}>
            Save
          </Button>
        </MainCard>
      )}
      {view.mode === 'Initial' && (
        <MainCard
          title="Leads"
          secondary={
            <Box
              sx={{
                ml: 2,
                // mr: 3,
                [theme.breakpoints.down('md')]: {
                  mr: 2
                }
              }}
            >
              <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                      background: theme.palette.secondary.dark,
                      color: theme.palette.secondary.light
                    }
                  }}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  color="inherit"
                >
                  <IconPlus stroke={2} size="1.3rem" />
                </Avatar>
              </ButtonBase>
            </Box>
          }
        >
          <MaterialReactTable table={table} />
        </MainCard>
      )}
      {view.mode === 'Edit' && (
        <MainCard
          title="Leads Updations"
          secondary={
            <Box
              sx={{
                ml: 2,
                // mr: 3,
                [theme.breakpoints.down('md')]: {
                  mr: 2
                }
              }}
            >
              <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    '&[aria-controls="menu-list-grow"],&:hover': {
                      background: theme.palette.secondary.dark,
                      color: theme.palette.secondary.light
                    }
                  }}
                  aria-haspopup="true"
                  onClick={handleClose}
                  color="inherit"
                >
                  <KeyboardBackspaceRounded stroke={2} size="1.3rem" />
                </Avatar>
              </ButtonBase>
            </Box>
          }
        >
          <Grid container>
            <Grid xs={4} p={2}>
              <TextField fullWidth type="date" variant="outlined" name="dob" className="w-100" />
            </Grid>
            <Grid xs={4} p={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Source</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                  <MenuItem value={'website'}>Website</MenuItem>
                  <MenuItem value={'Expo'}>Expo</MenuItem>
                  <MenuItem value={'Reference'}>Reference</MenuItem>
                  <MenuItem value={'coldcalls'}>Cold Calls</MenuItem>
                  <MenuItem value={'others'}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Pilot" variant="outlined" />
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Company Name" variant="outlined" />
            </Grid>{' '}
            <Grid xs={4} p={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                  <MenuItem value={'website'}>Website</MenuItem>
                  <MenuItem value={'Expo'}>Expo</MenuItem>
                  <MenuItem value={'Reference'}>Reference</MenuItem>
                  <MenuItem value={'coldcalls'}>Cold Calls</MenuItem>
                  <MenuItem value={'others'}>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Contact Name" variant="outlined" />
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Department" variant="outlined" />
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Phone Number" variant="outlined" />
            </Grid>
            <Grid xs={4} p={2}>
              <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
            </Grid>
            <Grid xs={4} p={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Business Verticle</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                  <MenuItem value={'teardown'}>Tear Down</MenuItem>
                  <MenuItem value={'operations'}>Operations</MenuItem>
                  <MenuItem value={'concerns'}>Concerns</MenuItem>
                  <MenuItem value={'software'}>Software</MenuItem>
                  <MenuItem value={'hr'}>HR</MenuItem>
                  <MenuItem value={'finance'}>Finance</MenuItem>
                  <MenuItem value={'scanning'}>Scanning</MenuItem>
                  <MenuItem value={'Modeling'}>Modeling</MenuItem>
                  <MenuItem value={'drivingunit'}>Driving Unit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid xs={4} p={2}>
              <TextField fullWidth variant="outlined" placeholder="Lead Description" multiline rows={1} maxRows={4} />{' '}
            </Grid>
            <Grid xs={4} p={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="status">
                  <MenuItem value={'newlead'}>New Lead</MenuItem>
                  <MenuItem value={'contactEstablish'}>Contact Establish</MenuItem>
                  <MenuItem value={'technicleMeeting'}>Technicle Meeting</MenuItem>
                  <MenuItem value={'requirementConfirm'}>Requirement Confirm</MenuItem>
                  <MenuItem value={'hold'}>Hold</MenuItem>
                  <MenuItem value={'reject'}>Reject</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
          </Grid>
          {/* <Divider /> */}
          <Box p={5} className="edit-table-container">
            <MaterialReactTable table={editable} />
          </Box>
          <Box p={5} className="edit-table-container">
            <MaterialReactTable table={editable} />
          </Box>
          <Button variant="contained" style={{ float: 'right', margin: '2rem' }}>
            Save
          </Button>
        </MainCard>
      )}
    </div>
  );
};

export default BusinessLeads;
