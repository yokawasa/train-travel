import { BookingsService } from "../api/resources/bookings/service/BookingsService";
import { getBooking, getBookings, createBooking, deleteBooking } from "../database";
import { NotFoundError, InternalServerError } from "../api";
import { Booking } from "../api";

export default new BookingsService({
  async createBooking(req, res) {
    const booking = createBooking(req.body as Booking);
    if (booking instanceof Error) {
      throw new InternalServerError({
        status: 500,
        title: "Failed to create booking",
        detail: booking.message,
      });
    }
    return res.send({
      ...booking,
      links: { self: `/bookings/${booking.id}` },
    });
  },

  async deleteBooking(req, res) {
    const deleted = deleteBooking(req.params.bookingId);
    if (!deleted) {
      throw new NotFoundError({
        status: 404,
        title: "Booking not found",
        detail: `Booking with id ${req.params.bookingId} not found`,
      });
    }
    return res.send();
  },

  async getBookings(req, res) {
    const allBookings = getBookings();
    const page = parseInt((req.query as any).page) || 1;
    const limit = parseInt((req.query as any).limit) || 10;
    const start = (page - 1) * limit;
    const paged = allBookings.slice(start, start + limit);
    const baseUrl = `/bookings`;
    return res.send({
      data: paged,
      links: {
        self: `${baseUrl}?page=${page}&limit=${limit}`,
        ...(start + limit < allBookings.length && { next: `${baseUrl}?page=${page + 1}&limit=${limit}` }),
        ...(page > 1 && { prev: `${baseUrl}?page=${page - 1}&limit=${limit}` }),
      },
    });
  },

  async getBooking(req, res) {
    const booking = getBooking(req.params.bookingId);
    if (!booking) {
      throw new NotFoundError({
        status: 404,
        title: "Booking not found",
        detail: `Booking with id ${req.params.bookingId} not found`,
      });
    }
    return res.send({
      ...booking,
      links: { self: `/bookings/${booking.id}` },
    });
  },
});
