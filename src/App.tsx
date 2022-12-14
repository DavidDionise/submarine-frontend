import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8082";

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
      status: "ACTIVE",
      data: { setHead: +angle, pid: { gain: +pidGain } },
    };
    fetch(`${apiBaseUrl}/command`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
  }

  function handleClickEnd() {
    fetch(`${apiBaseUrl}/command`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "STOP" }),
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
