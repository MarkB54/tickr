import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    // Do not encrypt the seesion information
    signed: false,
    // Require user to be on a HTTPS connection
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// If a route is used that is not any of the prior ones, it is not found
app.all('*', async () => {
  // Express will capture this error and throw it to error-handling middleware
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
