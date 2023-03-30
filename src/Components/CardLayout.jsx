import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@mui/material";
import VideoCard from "./Card";
import {
  deleteUser,
  deleteUser2,
  getallUsers,
  addUser,
  getallUsers2,
  addUser2,
} from "../service/api";
// import { Navigate } from "react-router-dom";

const VideoCardsGrid = ({ img }) => {
  const [user, setUser] = useState([]);
  const [user2, setUser2] = useState([]);
  // const [history, sethistory] = useState([]);
  // const [edu, setedu] = useState(false);

  // educationImg
  // entertainmentImg

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      if (img === "educationImg") {
        const response = await getallUsers();
        const data = response.data;
        // console.log(data, "data after get ");
        setUser(data);
        setUser((prevState) => [
          ...prevState,
          { id: "new", name: "Add Card", link: "" },
        ]);
      } else {
        const response2 = await getallUsers2();
        const data2 = response2.data;
        // console.log(data, "data after get ");
        setUser2(data2);
        setUser2((prevState) => [
          ...prevState,
          { id: "new", name: "Add Card", link: "" },
        ]);
      }
    } catch (error) {
      console.error("Error getting users:", error);
    }
  };

  const AddNewUser = async (newuser) => {
    if (img === "educationImg") {
      await addUser(newuser);
      setUser((prevState) => [
        ...prevState.slice(0, -1),
        newuser,
        { id: "new", name: "Add Card", link: "" },
      ]);
    } else {
      await addUser2(newuser);
      setUser2((prevState) => [
        ...prevState.slice(0, -1),
        newuser,
        { id: "new", name: "Add Card", link: "" },
      ]);
    }
    // console.log(user, "user after updated");
    window.location.reload(true);
  };

  const moveCard = async (id, userinfo) => {
    if (img === "educationImg") {
      await addUser2(userinfo);
      setUser2((prevState) => [
        ...prevState.slice(0, -1),
        userinfo,
        { id: "new", name: "Add Card", link: "" },
      ]);

      await deleteUser(id);
    } else {
      await addUser(userinfo);
      setUser((prevState) => [
        ...prevState.slice(0, -1),
        userinfo,
        { id: "new", name: "Add Card", link: "" },
      ]);

      await deleteUser2(id);
    }

    window.location.reload(true);
    getUsers();
  };

  // const cardclick = (cardinfo) => {
  //   sethistory((prevState) => [...prevState, cardinfo]);

  //   console.log(history, "all cards info");
  // };

  return (
    <>
      {console.log(user, "user")}
      <Grid container spacing={2}>
        {img === "educationImg" &&
          user.map((ele, index) => {
            console.log(ele, "ele in cardlayout");
            return (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <VideoCard
                  ele={ele}
                  img={img}
                  // ref={addCardRef}
                  handleAddUser={AddNewUser}
                  getdatas={getUsers}
                  movedata={moveCard}
                  // handleCardClick={cardclick}
                />
              </Grid>
            );
          })}
        {img === "entertainmentImg" &&
          user2.map((ele, index) => {
            console.log(ele, "ele in cardlayout");
            return (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <VideoCard
                  ele={ele}
                  img={img}
                  // ref={addCardRef}
                  handleAddUser={AddNewUser}
                  getdatas={getUsers}
                  movedata={moveCard}
                  // handleCardClick={cardclick}
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default VideoCardsGrid;
