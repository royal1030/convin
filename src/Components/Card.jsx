import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBa/ckIos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import UserForm from "./Userform";
import {
  editUser,
  getallUsers,
  addUser,
  addUser2,
  deleteUser,
  editUser2,
  deleteUser2,
} from "../service/api";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import { Link } from "react-router-dom";
// import axios from "axios";

const VideoCard = ({
  ele,
  img,
  handleAddUser,
  getdatas,
  movedata,
  // handleCardClick,
}) => {
  // console.log(ele, "ele in card");

  //   const [thumbnailUrl, setThumbnailUrl] = useState("");

  //   useEffect(() => {
  //     const getThumbnail = async () => {
  //       try {
  //         const videoId = ele.link.split("v=")[1];
  //         const response = await axios.get(
  //           `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyDl1t38xRS1M0ixio8bLBMmZ4DBfYQ-pe4&part=snippet`
  //         );
  //         const thumbnailUrl =
  //           response.data.items[0].snippet.thumbnails.medium.url;
  //         setThumbnailUrl(thumbnailUrl);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     getThumbnail();
  //   }, [ele.link]);

  const [editOpen, setEditOpen] = useState(false);
  const [cardData, setCardData] = useState({ name: ele.name, link: ele.link });
  const [showForm, setShowForm] = useState(false);

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handlePlayClick = (link) => {
    window.open(link, "_blank");
  };

  const editUserDetails = async (id) => {
    if (img === "educationImg") {
      await editUser(id, cardData);
    } else {
      await editUser2(id, cardData);
    }
    handleEditClose();
  };

  const handleDelete = async (id) => {
    if (img === "educationImg") {
      await deleteUser(id);
    } else {
      await deleteUser2(id);
    }
    window.location.reload(true);
    getdatas();
  };

  // const handleAddUser = async (newuser) => {
  //   await addUser(newuser);
  // };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="250"
          image={require(`../Assets/Images/${img}.jpg`)}
          // controls
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {cardData.name}
          </Typography>
        </CardContent>

        {ele.id !== "new" && (
          <CardActions>
            <IconButton
              onClick={() => {
                handlePlayClick(cardData.link);
                // handleCardClick(cardData);
              }}
            >
              <PlayArrowIcon />
            </IconButton>
            <IconButton onClick={handleEditOpen}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(ele.id)}>
              <DeleteIcon />
            </IconButton>
            <Button
              variant="outlined"
              endIcon={<SendIcon />}
              onClick={() => movedata(ele.id, ele)}
            >
              Move
            </Button>
          </CardActions>
        )}

        {ele.id === "new" && (
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => setShowForm(true)}
            >
              Add User
            </Button>
          </CardActions>
        )}
      </Card>

      {showForm && (
        <UserForm
          onAddUser={handleAddUser}
          onClose={() => setShowForm(false)}
        />
      )}

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Card</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={cardData.name}
            onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
          />
          <TextField
            label="Link"
            value={cardData.link}
            onChange={(e) => setCardData({ ...cardData, link: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={() => editUserDetails(ele.id)}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VideoCard;
