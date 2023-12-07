import React from 'react';

const Access = () => {
 
 
  const [dob, setDOB] = useState('');
 
  const handleDOBChange = (event) => {
      setDOB(event.target.value);
  };
 
  const fileInputRef = React.createRef();
  const handleImportClick = () => {
      fileInputRef.current.click();
  };
 
  const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = async (e) => {
              const data = new Uint8Array(e.target.result);
              const workbook = XLSX.read(data, { type: 'array' });
              const sheetName = workbook.SheetNames[0];
              const sheet = workbook.Sheets[sheetName];
              const parsedData = XLSX.utils.sheet_to_json(sheet);
 
              await uploadToServer(parsedData);
          };
          reader.readAsArrayBuffer(file);
      }
  };
 
  const uploadToServer = async (data) => {
      try {
          const response = await fetch('http://localhost:3001/upload', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data }),
          });
 
          // Handle response if needed
          console.log('Upload successful:', response);
      } catch (error) {
          console.error('Error uploading file:', error);
      }
  };
 
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
 
  const handleInputChange = (e) => {
      setInputValue(e.target.value);
  };
 
  const handleAddOption = () => {
      if (inputValue.trim() !== '') {
          setOptions([...options, inputValue]);
          setInputValue('');
      }
  };
 
  const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
  };
 
  const [view, setView] = useState({
      visible: false,
      mode: 'Initial' // 'add', 'edit', 'view'
  });
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
      setOpen(true);
      console.log('open', open);
  };
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
              <IconButton onClick={handleDelete}>
                  <DeleteRounded style={{ color: '#2196f3' }} />
              </IconButton>
              {/* <IconButton onClick={handleView}>
                  <VisibilityRounded style={{ color: '#2196f3' }} />
              </IconButton> */}
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
                  <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                      accept=".xls,.xlsx"
                  />
                  <Button variant="contained" style={{ marginRight: '1rem' }} color="primary" onClick={handleImportClick} startIcon={<IconUpload />}>
                      Import
                  </Button>
                  <Button onClick={handleExportData} variant="contained" color="primary" startIcon={<IconDownload />}>
                      Export
                  </Button>
              </div>
          </>
      )
     
  });
   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#e3f2fd',
          color: '#333'
      },
      [`&.${tableCellClasses.body}`]: {
          fontSize: 14
      }
  }));
 
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(even)': {
          backgroundColor: theme.palette.action.hover
      },
   
      '&:last-child td, &:last-child th': {
          border: 0
      }
  }));
 
  function createData(name, calories, fat, carbs) {
      return { name, calories, fat, carbs };
  }
 
  const rows = [
      createData('Frozen yoghurt', 159, 6.0, 24),
      createData('Ice cream sandwich', 237, 9.0, 3),
      createData('Eclair', 262, 16.0, 24),
      createData('Cupcake', 305, 3.7, 67),
      createData('Gingerbread', 356, 16.0, 49)
  ];
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
    <div>
      <p>hhhhhhhhhhhhhhhh</p>
    </div>
  );
};
export default Access;
