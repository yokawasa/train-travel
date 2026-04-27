import cors from "cors";
import express from "express";

import { register } from ".";
import { NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, ConflictError, TooManyRequestsError, InternalServerError } from "./api";
import bookings from "./services/bookings";
import stations from "./services/stations";
import trips from "./services/trips";
import payments from "./services/payments";

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(cors());

register(app, {
  bookings: bookings,
  payments: payments,
  stations: stations,
  trips: trips,
});

const apiErrors = [NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, ConflictError, TooManyRequestsError, InternalServerError];

// Add Express error handler to ignore API error instances (already sent response)
app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (apiErrors.some((E) => err instanceof E)) {
    return;
  }
  next(err);
});

app.listen(PORT);
console.log(`🎉 Listening on port ${PORT}...`);

export default app;
