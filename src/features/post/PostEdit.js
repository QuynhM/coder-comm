import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Card, Paper, Stack, Typography, alpha } from "@mui/material";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "./postSlice";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: null,
};

export default function PostEdit({ postId }) {
  const { isLoading } = useSelector((state) => state.post);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const handleDrop = React.useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    dispatch(
      editPost({ postId: postId, content: data.content, image: data.image })
    );
  };

  return (
    <React.Fragment>
      <Typography onClick={handleClickOpen}>Edit</Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ maxWidth: "50vw", margin: "auto" }}
      >
        {/* <Paper sx={{ maxWidth: "50vw", margin: "auto" }}> */}
        {/* Set maxWidth on Paper */}
        <DialogTitle id="alert-dialog-title">{"Edit Post"}</DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {/* <Card sx={{ p: 12 }}> */}
            {/* <Stack spacing={2}> */}
            <FTextField
              name="content"
              multiline
              //   fullWidth
              rows={4}
              sx={{
                "& fieldset": {
                  borderWidth: `1px !important`,
                  borderColor: alpha("#919EAB", 0.32),
                },
              }}
              inputProps={{
                style: { width: "600px" },
              }}
            ></FTextField>

            <FUploadImage
              name="image"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
            />
            {/* </Stack> */}
            {/* </Card> */}
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Disagree</Button> */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                size="small"
                loading={isSubmitting || isLoading}
                onClick={handleClose}
              >
                Post
              </LoadingButton>
            </Box>
          </DialogActions>
        </FormProvider>
        {/* </Paper> */}
      </Dialog>
    </React.Fragment>
  );
}
