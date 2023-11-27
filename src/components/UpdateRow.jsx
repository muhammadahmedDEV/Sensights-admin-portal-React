import { Box, CircularProgress, Fab, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";

const UpdateRow = ({ params, rowId, setRowId, tableData, setTableData }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [changed, setChanged] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const isObjInArray = tableData.some(
      (item) => JSON.stringify(item) === JSON.stringify(params.row)
    );
    setChanged(isObjInArray);
  }, [tableData, params.row]);

  const handleRowUpdate = () => {
    setLoading(true);
    const { id, name, email, age } = params.row;
    const updatedData = tableData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          name,
          email,
          age,
        };
      }
      return item;
    });


    fetch(`${process.env.REACT_APP_BACKEND}/table-data/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params.row),
    })
      .then((response) => response.json())
      .then(() => {
        setTableData(updatedData);
        setSuccess(true);
        setSnackbarOpen(true);
      });

    setRowId(null);
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId, params.id, success]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading || changed}
          onClick={handleRowUpdate}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message="Record updated successfully!"
      />
    </Box>
  );
};

export default UpdateRow;