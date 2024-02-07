import React from "react";
import { Appear, Button, Paragraph } from "arwes";
import Clickable from "../components/Clickable";

const Login = (props) => {
  const handleGoogleSignIn = (event) => {
    // Redirect to your authentication route (e.g., Google authentication)
    event.preventDefault();
    window.location.href = encodeURI("http://localhost:8001/auth/google"); // Adjust the URL accordingly
  };

  return (
    <Appear id="login" animate show={props.entered}>
      <Paragraph>
        Sign in to access interstellar travel missions and explore Kepler
        Exoplanets.
      </Paragraph>
      <form
        style={{
          display: "inline-grid",
          gridTemplateColumns: "auto auto",
          gridGap: "10px 20px",
        }}
      >
        <Clickable>
          <Button
            animate
            show={props.entered}
            onClick={async (event) => {
              await handleGoogleSignIn(event);
            }}
            layer="success"
            disabled={props.isLoggingIn}
          >
            Sign In with Google
          </Button>
        </Clickable>
      </form>
    </Appear>
  );
};

export default Login;
