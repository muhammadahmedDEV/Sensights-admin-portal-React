import { Box, Fab, Snackbar, Stack, styled, TextField } from "@mui/material";
import { useState } from "react";
import { Add, Cancel, Save } from "@mui/icons-material";

const StyledInput = styled(TextField)(({ width }) => ({
  width,
  "& .MuiInputBase-root": {
    borderRadius: 0,
    border: 1,
  },
}));

const AddRow = ({ tableData, setTableData }) => {
  const [showFields, setShowFields] = useState(false);
  const [newData, setNewData] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleRowAdd = () => {
    fetch(`${process.env.REACT_APP_BACKEND}/table-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        setTableData([...tableData, data]);
        setShowFields(false);
        setNewData({
          name: "",
          age: "",
          email: "",
        });
        setShowSnackbar(true);
        setTimeout(() => {
          setShowSnackbar(false);
        }, 2000);
      });
  };

  return (
    <Box mx={2} mb={2} height={70}>
      {showFields ? (
        <>
          <p style={{ fontSize: 18, margin: 6 }}>
            <b>CREATE NEW ROW:</b>
          </p>
          <Stack alignItems="center" direction={"row"}>
            <StyledInput
              label="Name"
              variant="filled"
              size="small"
              value={newData.name}
              onChange={(e) =>
                setNewData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
              width={"30%"}
            />
            <StyledInput
              label="Age"
              variant="filled"
              size="small"
              value={newData.age}
              onChange={(e) =>
                setNewData((prevData) => ({ ...prevData, age: e.target.value }))
              }
              width={"30%"}
            />
            <StyledInput
              label="Email"
              variant="filled"
              size="small"
              value={newData.email}
              onChange={(e) =>
                setNewData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }))
              }
              width={"40%"}
            />

            <>
              <Fab
                color="grey"
                size="small"
                sx={{ marginLeft: 1 }}
                onClick={handleRowAdd}
              >
                <Save />
              </Fab>
              <Fab
                color="grey"
                size="small"
                sx={{ marginLeft: 1 }}
                onClick={() => setShowFields(false)}
              >
                <Cancel />
              </Fab>
            </>
          </Stack>
        </>
      ) : (
        <Fab
          sx={{
            width: 50,
            height: 50,
            marginTop: 2,
            marginLeft: 1,
          }}
          onClick={() => setShowFields(true)}
        >
          <Add />
        </Fab>
      )}
      <Snackbar
        open={showSnackbar}
        message="Record added successfully!"
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
      />
    </Box>
  );
};

export default AddRow;
