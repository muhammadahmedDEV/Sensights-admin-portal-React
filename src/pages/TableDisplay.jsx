import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import UpdateRow from "../components/UpdateRow";
import DeleteRow from "../components/DeleteRow";
import AddRow from "../components/AddRow";

const TableDisplay = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/table-data`)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      });
  }, []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 200 },
      {
        field: "name",
        headerName: "Name",
        width: 300,
        type: 'string',
        editable: true,
      },
      {
        field: "age",
        headerName: "Age",
        width: 170,
        type: 'number',
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 400,
        type: 'string',
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <>
            <UpdateRow
              {...{ params, rowId, setRowId, tableData, setTableData }}
            />
            <DeleteRow
              {...{ params, rowId, setRowId, tableData, setTableData }}
            />
          </>
        ),
      },
    ],
    [rowId, tableData]
  );

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: "center", mt: 3}}
      >
        Manage Users Assesment
      </Typography>

      <AddRow {...{ tableData, setTableData }} />

      <DataGrid
        columns={columns}
        rows={tableData}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        onCellClick={(params) => setRowId(params.id)}
        editMode='row'
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: grey[200],
          },
        }}
      />

    </Box>
  );
};

export default TableDisplay;
