import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TabloMysql from "./components/TabloMysql.tsx";
import TabloMongo from "./components/TabloMongo.tsx";
import "./App.css";

const App = () => {
  const [mysqldata, setMysqlData] = useState([]);
  const [mongodata, setMongoData] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);

  const inc = () => setRefreshCount(refreshCount + 1);

  const ip = "192.168.68.113"; // Replace with your local IP address

  useEffect(() => {
    fetch(`http://${ip}:8000/mysqldata`)
      .then((response) => response.json())
      .then((data) => setMysqlData(data))
      .catch((error) => console.error("Data fetch error (MySQL):", error));
  }, [refreshCount]);

  useEffect(() => {
    fetch(`http://${ip}:8000/mongodata`)
      .then((response) => response.json())
      .then((data) => setMongoData(data))
      .catch((error) => console.error("Data fetch error (MongoDB):", error));
  }, [refreshCount]);

  return (
    <>
      <div>
        <Typography variant="h4" gutterBottom>
          My Book List
        </Typography>
        <Box>
          <TabloMysql data={mysqldata} />
          <br />
          <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
            Shows book titles and page counts from the MySQL database.
          </Typography>
          <br />
          <TabloMongo data={mongodata} />
          <br />
          <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
            Shows book titles and page counts from the MongoDB database.
          </Typography>
        </Box>
        <Typography variant="overline" gutterBottom sx={{ display: "block" }}>
          REFRESH COUNT: {refreshCount}
        </Typography>
        <Button variant="contained" onClick={inc}>
          REFRESH
        </Button>
      </div>
    </>
  );
};

export default App;
