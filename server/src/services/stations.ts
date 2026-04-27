import { StationsService } from "../api/resources/stations/service/StationsService";
import { getStations } from "../database";

export default new StationsService({
  async getStations(req, res) {
    const allStations = getStations();
    const page = parseInt((req.query as any).page) || 1;
    const limit = parseInt((req.query as any).limit) || 10;
    const start = (page - 1) * limit;
    const paged = allStations.slice(start, start + limit);
    const baseUrl = `/stations`;
    return res.send({
      data: paged,
      links: {
        self: `${baseUrl}?page=${page}&limit=${limit}`,
        ...(start + limit < allStations.length && { next: `${baseUrl}?page=${page + 1}&limit=${limit}` }),
        ...(page > 1 && { prev: `${baseUrl}?page=${page - 1}&limit=${limit}` }),
      },
    });
  },
});
