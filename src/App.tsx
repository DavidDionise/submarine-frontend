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
      <StyledLabel htmlFor="angle-input">
        Enter an Angle Between 0 and 360
      </StyledLabel>
      <StyledInput
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleUpdateAngle(e.target.value)
        }
        value={angle}
        id="angle-input"
      />
      <StartButton onClick={handleClickStart}>Start</StartButton>
      <EndButton onClick={handleClickEnd}>End</EndButton>
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
`;

const StyledInput = styled.input`
  width: 36px;
`;

const StyledLabel = styled.label``;

const StyledButton = styled.button``;

const StartButton = styled(StyledButton)`
  background-color: green;
`;

const EndButton = styled(StyledButton)`
  background-color: red;
`;

export default App;
