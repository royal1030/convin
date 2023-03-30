import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import ResponsiveAppBar from "./Navbar";
import Cards from "./Card";
import VideoCardsGrid from "./CardLayout";
import { deleteUser, getallUsers } from "../service/api";

const Home = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await getallUsers();
    console.log(response.data, "response");
    setUser(response.data);
  };

  const deleteData = async (id) => {
    await deleteUser(id);
    getUsers();
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box my={5}>
          <Typography variant="h3" component="h2" align="center">
            Educational Videos
          </Typography>
          {/* {user.map((data) => {
            console.log(data, "data in home");
            return <VideoCardsGrid data={data} />;
          })} */}
          <VideoCardsGrid img={"educationImg"} />
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Box my={5}>
          <Typography variant="h3" component="h2" align="center">
            Entertainment Videos
          </Typography>
          <VideoCardsGrid img={"entertainmentImg"} />
        </Box>
      </Container>
    </>
  );
};

export default Home;
