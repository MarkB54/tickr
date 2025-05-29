import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@mbtickr/common';

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    // Do not encrypt the seesion information
    signed: false,
    // Require user to be on a HTTPS connection
    secure: process.env.NODE_ENV !== 'test',
  })
);
// Set req.current user property -> needs to be done after cookieSession is set
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

// If a route is used that is not any of the prior ones, it is not found
app.all('*', async () => {
  // Express will capture this error and throw it to error-handling middleware
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
