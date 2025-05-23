import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  // If req.session does not exist (evaluate to true) or
  // req.session.jwt does not exist
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  // if the token has been tampered with, verify() will throw an error
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    // Send the payload
    res.send({ currentUser: payload });
  } catch (err) {
    // Say they are not logged in
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
