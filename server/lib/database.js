"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = createBooking;
exports.getBooking = getBooking;
exports.getBookings = getBookings;
exports.getStations = getStations;
exports.getTrips = getTrips;
function createBooking(booking) {
    return booking;
}
function getBooking(key) {
    return undefined;
}
function getBookings() {
    return [
        {
            id: "123",
            tripId: "456",
            passengerName: "Alice",
            hasBicycle: false,
            hasDog: false,
        },
        {
            id: "124",
            tripId: "457",
            passengerName: "Bob",
            hasBicycle: true,
            hasDog: false,
        },
    ];
}
function getStations() {
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
function getTrips() {
    return [
        {
            id: "456",
            origin: "123",
            destination: "124",
            departureTime: new Date("2021-07-01T12:00:00Z"),
            arrivalTime: new Date("2021-07-01T13:00:00Z"),
        },
        {
            id: "457",
            origin: "124",
            destination: "123",
            departureTime: new Date("2021-07-01T14:00:00Z"),
            arrivalTime: new Date("2021-07-01T15:00:00"),
        },
    ];
}
