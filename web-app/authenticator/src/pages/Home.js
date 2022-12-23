import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Auth } from "aws-amplify";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const theme = createTheme();

export default function SignInSide() {
  const [user, setUser] = React.useState(null);

  const signIn = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const user = await Auth.signIn(data.get("email"));
      console.log(user);
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = {
      username: data.get("email"),
      password: "9099da-p0do-asdf",
      attributes: {
        name: data.get("fullName"),
      },
    };
    try {
      const user = await Auth.signUp(params);
      console.log(user);
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  const answerCustomChallenge = async (answer) => {
    // Send the answer to the User Pool
    // This will throw an error if it’s the 3rd wrong answer

    // It we get here, the answer was sent successfully,
    // but it might have been wrong (1st or 2nd time)
    // So we should test if the user is authenticated now
    try {
      const cognitoUser = await Auth.sendCustomChallengeAnswer(user, "725094");
      console.log("User =>", cognitoUser);

      // This will throw an error if the user is not yet authenticated:
      await Auth.currentSession();
    } catch (err) {
      console.error(err, "Apparently the user did not enter the right code");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {/* <SignIn signIn={signIn} /> */}
          <SignUp signUp={signUp} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
