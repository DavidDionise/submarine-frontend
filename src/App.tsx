import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

const apiBaseUrl =
  process.env.REACT_APP_GOTIFY_BASE_URL;

const gotifyToken = 
  process.env.REACT_APP_GOTIFY_TOKEN

function App() {
  const [angle, setAngle] = useState("0");
  const [pidGain, setPidGain] = useState("1");

  function handleUpdateAngle(updatedAngle: string) {
    if (updatedAngle == "") {
      setAngle("");
    } else {
      const validInput =
        /^\d*$/.test(updatedAngle) && +updatedAngle >= 0 && +updatedAngle < 360;

      if (validInput) {
        setAngle(updatedAngle);
      }
    }
  }

  function handleUpdatePidGain(updatedPidGain: string) {
    if (updatedPidGain == "") {
      setPidGain("");
    } else {
      const validInput = /^\d*(\.|\d*)\d*$/.test(updatedPidGain);

      if (validInput) {
        setPidGain(updatedPidGain);
      }
    }
  }

  function handleClickStart() {
    const reqBody = {
      message: "ACTIVE",
      extras: {
          set_head: 180,
          esc_motor_value: 0.2
      }
    };
    fetch(`${apiBaseUrl}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${gotifyToken}`
      },
      body: JSON.stringify(reqBody),
    });
  }

  function handleClickEnd() {
    fetch(`${apiBaseUrl}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${gotifyToken}`
      },
      body: JSON.stringify({ message: "STOP" }),
    });
  }

  return (
    <OuterContainer>
      <InnerContainer>
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleUpdateAngle(e.target.value)
          }
          value={angle}
          label="Enter an Angle"
          placeholder="Integer Between 0 and 360"
        />
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleUpdatePidGain(e.target.value)
          }
          value={pidGain}
          label="Enter PID Gain"
          placeholder="Positive Number"
        />
        <Button size="large" variant="contained" onClick={handleClickStart}>
          Start
        </Button>
        <Button size="large" variant="contained" onClick={handleClickEnd}>
          End
        </Button>
      </InnerContainer>
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 80%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px 12px 12px 0;

  & > * {
    margin-top: 24px !important;
  }
`;

export default App;
