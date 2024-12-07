import React from "react";
import { Appear, Button, Paragraph } from "arwes";
import Clickable from "../components/Clickable";

const Login = (props) => {
  const handleGoogleSignIn = (event) => {
    event.preventDefault();
    window.location.href = encodeURI(
      "https://nasa-launch-simulation-app-be.vercel.app/auth/google"
    );
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
