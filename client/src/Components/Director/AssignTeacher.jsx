import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Button, Typography, Box, MenuItem } from "@mui/material";
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

export default function ResponsiveDialog({ onClose, id }) {
  const theme = useTheme();
  console.log(Classes);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const selectedClasses = watch("classes");
  const handleClose = () => {
    if (!selectedClasses)
    {
      alert("No class Selected Aborting!!");
    }
    console.log("Selected classes:", selectedClasses);
    onClose();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={true}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {`choose A class to assign Teacher with id:${id} `}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
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
          {errors.classes && (
            <Typography variant="h7" color="red">
              {errors.classes.message}
            </Typography>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} variant="contained">
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  );
}
