import { randomUUID } from "crypto";
import { Booking, BookingPayment, Station, Trip } from "./api";

const bookingsStore = new Map<string, Booking>([
  [
    "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      tripId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      passengerName: "Alice",
      hasBicycle: false,
      hasDog: false,
    },
  ],
  [
    "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    {
      id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      tripId: "c9d8e7f6-a5b4-3210-9876-543210fedcba",
      passengerName: "Bob",
      hasBicycle: true,
      hasDog: false,
    },
  ],
]);

const paymentsStore = new Map<string, BookingPayment>();

export function createBooking(booking: Booking): Booking | Error {
  const newBooking = { ...booking, id: randomUUID() };
  bookingsStore.set(newBooking.id!, newBooking);
  return newBooking;
}

export function getBooking(key: string): Booking | undefined {
  return bookingsStore.get(key);
}

export function getBookings(): Booking[] {
  return Array.from(bookingsStore.values());
}

export function deleteBooking(key: string): boolean {
  return bookingsStore.delete(key);
}

export function createPayment(
  bookingId: string,
  payment: BookingPayment
): BookingPayment | Error {
  const newPayment: BookingPayment = {
    ...payment,
    id: randomUUID(),
    status: "succeeded",
  };
  paymentsStore.set(bookingId, newPayment);
  return newPayment;
}

export function getPayment(bookingId: string): BookingPayment | undefined {
  return paymentsStore.get(bookingId);
}

export function getStations(): Station[] {
  return [
    {
      id: "efdbb9d1-02c2-4bc3-afb7-6788d8782b1e",
      name: "Berlin Hauptbahnhof",
      address: "Invalidenstraße 10557 Berlin, Germany",
      countryCode: "DE",
      timezone: "Europe/Berlin",
    },
    {
      id: "b2e783e1-c824-4d63-b37a-d8d698862f1d",
      name: "Paris Gare du Nord",
      address: "18 Rue de Dunkerque 75010 Paris, France",
      countryCode: "FR",
      timezone: "Europe/Paris",
    },
  ];
}

export function getTrips(): Trip[] {
  return [
    {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      origin: "efdbb9d1-02c2-4bc3-afb7-6788d8782b1e",
      destination: "b2e783e1-c824-4d63-b37a-d8d698862f1d",
      departureTime: new Date("2021-07-01T12:00:00Z"),
      arrivalTime: new Date("2021-07-01T13:00:00Z"),
    },
    {
      id: "c9d8e7f6-a5b4-3210-9876-543210fedcba",
      origin: "b2e783e1-c824-4d63-b37a-d8d698862f1d",
      destination: "efdbb9d1-02c2-4bc3-afb7-6788d8782b1e",
      departureTime: new Date("2021-07-01T14:00:00Z"),
      arrivalTime: new Date("2021-07-01T15:00:00Z"),
    },
  ];
}
