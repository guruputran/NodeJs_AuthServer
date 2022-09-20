/** @format */

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//Authenticate user
//require('crypto').randomBytes(64).toString('hex')  ==== to generate secret keys

// router.post("/api/login", (req, res) => {
//   const username = req.body.username;
//   const user = { username: username };
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: "3h",
//   });
//   res.json({ accessToken: accessToken });
// });

let refreshTokens = [];

router.post("/api/login", (req, res) => {
  const username = req.body.username;
  const user = { username: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}

router.post("/api/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ username: user.username });
    res.json({ accessToken: accessToken });
  });
});

module.exports = router;
