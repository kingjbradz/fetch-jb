import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { MatchDialogProps } from "../Helpers/Interfaces.tsx";

const MatchDialog = ({ matchedDog, open, onClose }: MatchDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Matched Dog</DialogTitle>
      <DialogContent sx={{ minWidth: 300 }}>
        {matchedDog ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>Name: {matchedDog.name}</Typography>
            <Typography>Age: {matchedDog.age}</Typography>
            <Typography>Breed: {matchedDog.breed}</Typography>
            <Typography>ZIP Code: {matchedDog.zip_code}</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={matchedDog.img}
                alt={matchedDog.name}
                style={{ width: "150px", border: "0.5px solid black" }}
              />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 200,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MatchDialog;
