import { TripsService } from "../api/resources/trips/service/TripsService";
import { getTrips } from "../database";

export default new TripsService({
  async getTrips(req, res) {
    const allTrips = getTrips();
    const page = parseInt((req.query as any).page) || 1;
    const limit = parseInt((req.query as any).limit) || 10;
    const start = (page - 1) * limit;
    const paged = allTrips.slice(start, start + limit);
    const baseUrl = `/trips`;
    return res.send({
      data: paged,
      links: {
        self: `${baseUrl}?page=${page}&limit=${limit}`,
        ...(start + limit < allTrips.length && { next: `${baseUrl}?page=${page + 1}&limit=${limit}` }),
        ...(page > 1 && { prev: `${baseUrl}?page=${page - 1}&limit=${limit}` }),
      },
    });
  },
});
