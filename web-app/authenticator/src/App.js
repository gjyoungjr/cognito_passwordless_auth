import React from "react";
import { Amplify } from "aws-amplify";

import SignInSide from "./pages/Home";

// Amplify Configs
import awsConfig from "./aws-exports";
Amplify.configure(awsConfig);

function App() {
  return <SignInSide />;
}

export default App;
