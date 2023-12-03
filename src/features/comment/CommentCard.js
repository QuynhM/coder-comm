import React from "react";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
import { useState } from "react";

function CommentCard({ comment }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleCancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  const handleDelete = async () => {
    setConfirmationDialogOpen(true);
  };

  const handleComfirmDelete = () => {
    setIsDeleting(true);
    dispatch(deleteComment({ commentId: comment._id }));
    setConfirmationDialogOpen(false);
  };
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />

          <Tooltip title="Delete Comment">
            <IconButton onClick={handleDelete} disabled={isDeleting}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      <Dialog
        open={confirmationDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this post?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleComfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default CommentCard;
