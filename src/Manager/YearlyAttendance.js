import React from 'react'
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';





const data = [
    {
      SNo: 1,
     
      Date: '2023-12-25',
      Name: 'Sara',
      Shift: 'General Shift',
      Intime: '9:00 AM',
      Outtime: '6:00 PM',
      Status: 'Present',
     
    },
    {
      SNo: 2,
     
      Date: '2023-12-25',
      Name: 'Sara',
      Shift: 'General Shift',
      Intime: '9:00 AM',
      Outtime: '6:00 PM',
      Status: 'Leave',
     
    },
    {
      SNo: 3,
     
      Date: '2023-12-25',
      Name: 'Sara',
      Shift: 'General Shift',
      Intime: '9:00 AM',
      Outtime: '6:00 PM',
      Status: 'Present',
     
    },
    {
      SNo: 4,
      
      Date: '2023-12-25',
      Name: 'Sara',
      Shift: 'General Shift',
      Intime: '9:00 AM',
      Outtime: '6:00 PM',
      Status: 'Leave',
     
    },
  ];
  

const YearlyAttendance = () => {

    const columns = useMemo(
        () => [
          {
            accessorKey: 'SNo',
            header: 'S No',
            size: 100,
          },
         
          {
            accessorKey: 'Date',
            header: 'Date',
            size: 150,
          },
          {
            accessorKey: 'Shift',
            header: 'Shift',
            size: 150,
          },
          {
            accessorKey: 'Intime',
            header: 'In Time',
            size: 150,
          },
          {
            accessorKey: 'Outtime',
            header: 'Out Time',
            size: 150,
          },
          {
            accessorKey: 'Status',
            header: 'Status',
            size: 300,
          },
        ],
        [],
      );
    
      const table = useMaterialReactTable({
        columns,
        data,
        columnFilterDisplayMode: 'popover',
      });
    

    return (
        <div>
            <MaterialReactTable  table={table} />;
        </div>
    )
}

export default YearlyAttendance
