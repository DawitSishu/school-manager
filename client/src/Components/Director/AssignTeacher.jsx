import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Button, Box, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";

const Classes = [
  "KG-A",
  "KG-B",
  "PREP-A",
  "PREP-B",
  "1A",
  "1B",
  "2A",
  "2B",
  "3A",
  "3B",
  "4A",
  "4B",
  "5A",
  "5B",
  "6A",
  "6B",
  "7A",
  "7B",
  "8A",
  "8B",
  "9A",
  "9B",
  "10A",
  "10B",
  "11-NS",
  "11-SS",
  "12-NS",
  "12-SS",
];

export default function ResponsiveDialog({ onClose, data }) {
  const theme = useTheme();
  const Subject = JSON.parse(data.subject);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    control,
    watch,
    formState: { errors },
  } = useForm();
  const selectedClasses = watch("classes");
  const selectedSubject = watch("subject");
  const handleClose = () => {
    if (!selectedClasses) {
      alert("No class Selected Aborting!!");
      return;
    }
    onClose({
      teacher_id: data.teacher_id,
      class_name: selectedClasses,
      subject: selectedSubject,
    });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {`Choose a class and subject for:  ${data.full_name}`}
      </DialogTitle>
      <DialogContent>
        <Controller
          name="classes"
          control={control}
          rules={{ required: "Please select a subject" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              value={field.value || null}
              options={Classes}
              getOptionLabel={(option) => option}
              onChange={(event, value) => field.onChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select class"
                  placeholder="Select class"
                />
              )}
              renderOption={(props, option, { selected }) => (
                <MenuItem {...props} key={option} value={option}>
                  {option}
                  {selected ? (
                    <Box component="span" color="info.main">
                      &#10003;
                    </Box>
                  ) : null}
                </MenuItem>
              )}
            />
          )}
        />
        <br />
        <br />
        <Controller
          name="subject"
          control={control}
          rules={{ required: "Please select a subject" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              value={field.value || null}
              options={Subject}
              getOptionLabel={(option) => option}
              onChange={(event, value) => field.onChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select subjects"
                  placeholder="Select subjects"
                />
              )}
              renderOption={(props, option, { selected }) => (
                <MenuItem {...props} key={option} value={option}>
                  {option}
                  {selected ? (
                    <Box component="span" color="info.main">
                      &#10003;
                    </Box>
                  ) : null}
                </MenuItem>
              )}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" autoFocus>
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
}
