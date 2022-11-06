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
    <Container>
      <TextField
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleUpdateAngle(e.target.value)
        }
        value={angle}
        label="Enter an Angle Between 0 and 360"
      />
      <Button variant="contained" onClick={handleClickStart}>
        Start
      </Button>
      <Button variant="contained" onClick={handleClickEnd}>
        End
      </Button>
    </Container>
  );
}

const Container = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
  max-width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px 12px 12px 0;

  & > * {
    margin-top: 24px !important;
  }
`;

export default App;
