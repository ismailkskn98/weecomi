const app = require("./app");
const env = require("./config/env");

app.listen(env.port, () => {
  console.log("NODE_ENV:", env.nodeEnv);
  console.log("CORS origins:", env.corsOrigins.join(", "));
  console.log(`WeeComi API is running on http://localhost:${env.port}`);
});
