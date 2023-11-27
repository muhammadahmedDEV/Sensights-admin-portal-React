import { Box, Fab, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";

const DeleteRow = ({ params, rowId, setRowId, tableData, setTableData }) => {
  const [success, setSuccess] = useState(false);

  const handleRowDelete = () => {
    const { id } = params.row;
    const data = [...tableData];
    const updatedData = data.filter((data) => data.id !== id);

    const result = fetch(`${process.env.REACT_APP_BACKEND}/table-data/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => setTableData(updatedData));

    if (result) {
      setSuccess(true);
      setRowId(null);
    }
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId, params.id, success]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <Fab
        color="primary"
        sx={{
          width: 40,
          height: 40,
        }}
        onClick={handleRowDelete}
      >
        <Delete />
      </Fab>
      <Snackbar
        open={success}
        autoHideDuration={5000}
        message="Record deleted successfully"
      />
    </Box>
  );
};

export default DeleteRow;