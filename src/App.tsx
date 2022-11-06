import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8082";

function App() {
  const [angle, setAngle] = useState(0);

  function handleUpdateAngle(updatedAngle: string) {
    const validInput =
      /^\d*$/.test(updatedAngle) && +updatedAngle >= 0 && +updatedAngle < 360;

    if (validInput) {
      setAngle(+updatedAngle);
    }
  }

  function handleClickStart() {
    fetch(`${apiBaseUrl}/command`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "ACTIVE", data: { setHead: angle } }),
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
          label="Enter an Angle Between 0 and 360"
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
