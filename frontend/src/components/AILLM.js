import "./FileUpload.css";

import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";

import Box from "@mui/material/Box";

import { Chatvoiceollamagroq } from "./chatvoiceollamagroq";
import { Chatvoiceollamagroqllama8b } from "./chatvoiceollamagroqllama8b";
import { Chatvoiceollamagroqllama70b } from "./chatvoiceollamagroqllama70b";
import { Chatvoiceollamagroqgptoss120b } from "./chatvoiceollamagroqgptoss120b";

import "react-awesome-button/dist/styles.css";
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from "react-awesome-button";

export const Contact = ({}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <Box
        boxShadow={3}
        style={{ color: "black" }}
        bgcolor="#f5f5f5"
        p={2}
        className="retro-box" // Add a class for retro style
        maxWidth="fit-content" // Set maximum width to fit the content
        margin="auto" // Center the box horizontally
        display="flex"
        flexDirection="column"
        alignItems="center" // Center the content vertically
        mt={10}
      >
        <div>
          <Typography variant="h6" align="center" color="white" component="p">
            <div>
              <Box
                boxShadow={3}
                style={{ color: "black" }}
                bgcolor="background.paper"
                p={2}
                className="retro-box" // Add a class for retro style
                maxWidth="fit-content" // Set maximum width to fit the content
                margin="auto" // Center the box horizontally
                display="flex"
                flexDirection="column"
                alignItems="center" // Center the content vertically
              >
                <Stack spacing={2} direction="row" justifyContent="center">
                  <AwesomeButton
                    type="instagram"
                    onPress={() => {
                      setActiveTab(700);
                    }}
                  >
                    gpt-oss-20b
                  </AwesomeButton>
                  <AwesomeButton
                    type="github"
                    onPress={() => {
                      setActiveTab(701);
                    }}
                  >
                    gpt-oss-120b
                  </AwesomeButton>
                  <AwesomeButton
                    type="whatsapp"
                    onPress={() => {
                      // Instead of opening a new tab, display the page in an iframe
                      setActiveTab(800);
                    }}
                  >
                    llama-3.1-8b-instant
                  </AwesomeButton>
                  <AwesomeButton
                    type="linkedin"
                    onPress={() => {
                      // Instead of opening a new tab, display the page in an iframe
                      setActiveTab(801);
                    }}
                  >
                    llama-3.3-70b-versatile
                  </AwesomeButton>
                </Stack>
              </Box>
            </div>
          </Typography>
        </div>
      </Box>

      <div>
        {activeTab === 700 && (
          <div style={{ color: "black" }}>
            <Box
              boxShadow={3}
              bgcolor="background.paper"
              p={2}
              className="retro-box" // Add a class for retro style
              maxWidth="1000px" // Set maximum width to fit the content
              margin="auto" // Center the box horizontally
              display="flex"
              flexDirection="column"
              alignItems="center" // Center the content vertically
            >
              <Chatvoiceollamagroq />
            </Box>
          </div>
        )}
      </div>

      <div>
        {activeTab === 701 && (
          <div style={{ color: "black" }}>
            <Box
              boxShadow={3}
              bgcolor="background.paper"
              p={2}
              className="retro-box" // Add a class for retro style
              maxWidth="1000px" // Set maximum width to fit the content
              margin="auto" // Center the box horizontally
              display="flex"
              flexDirection="column"
              alignItems="center" // Center the content vertically
            >
              <Chatvoiceollamagroqgptoss120b />
            </Box>
          </div>
        )}
      </div>

      <div>
        {activeTab === 800 && (
          <div style={{ color: "black" }}>
            <Box
              boxShadow={3}
              bgcolor="background.paper"
              p={2}
              className="retro-box" // Add a class for retro style
              maxWidth="1000px" // Set maximum width to fit the content
              margin="auto" // Center the box horizontally
              display="flex"
              flexDirection="column"
              alignItems="center" // Center the content vertically
            >
              <Chatvoiceollamagroqllama8b />
            </Box>
          </div>
        )}
      </div>

      <div>
        {activeTab === 801 && (
          <div style={{ color: "black" }}>
            <Box
              boxShadow={3}
              bgcolor="background.paper"
              p={2}
              className="retro-box" // Add a class for retro style
              maxWidth="1000px" // Set maximum width to fit the content
              margin="auto" // Center the box horizontally
              display="flex"
              flexDirection="column"
              alignItems="center" // Center the content vertically
            >
              <Chatvoiceollamagroqllama70b />
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};
