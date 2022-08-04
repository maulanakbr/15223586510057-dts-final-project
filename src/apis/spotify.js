// import React, { useState, useEffect } from "react";

const CLIENT_ID = "adfd558ba58f4caf930a991d84fc377e";
const CLIENT_SECRET = "b53f4f5e20bd45929e4547e69a8cb4bd";

// const getToken = () => {
//   const [accessToken, setAccessToken] = useState("");

//   useEffect(() => {
//     const authParams = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
//     };

//     fetch("https:/accounts.spotify.com/api/token", authParams)
//       .then((result) => result.json())
//       // .then((data) => console.log(data.access_token));
//       .then((data) => setAccessToken(data.access_token));
//   }, []);
// };

export { CLIENT_ID, CLIENT_SECRET };
