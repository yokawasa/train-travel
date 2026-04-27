import { PaymentsService } from "../api/resources/payments/service/PaymentsService";
import { createPayment, getBooking } from "../database";
import { NotFoundError, InternalServerError } from "../api";
import { BookingPayment } from "../api";

export default new PaymentsService({
  async createBookingPayment(req, res) {
    const booking = getBooking(req.params.bookingId);
    if (!booking) {
      throw new NotFoundError({
        status: 404,
        title: "Booking not found",
        detail: `Booking with id ${req.params.bookingId} not found`,
      });
    }
    const payment = createPayment(req.params.bookingId, req.body as BookingPayment);
    if (payment instanceof Error) {
      throw new InternalServerError({
        status: 500,
        title: "Failed to create payment",
        detail: payment.message,
      });
    }
    return res.send({
      ...payment,
      links: { booking: `/bookings/${req.params.bookingId}` },
    });
  },
});
