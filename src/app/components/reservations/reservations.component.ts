import {Component, OnInit} from "@angular/core";
import {Reservation} from "../models/reservation";
import {ReservationsService} from "../../services/reservations.service";

@Component({
    selector: "app-reservations",
    templateUrl: "./reservations.component.html",
    styleUrls: ["./reservations.component.scss"]
})
export class ReservationsComponent implements OnInit {
    reservations: Reservation[] = [];
    visibleReservations: Reservation[] = [];

    constructor(private reservationsService: ReservationsService) {
    }

    async ngOnInit(): Promise<void> {
        this.reservations = await this.getAllReservations();
        this.reservations.forEach(reservation => {
            reservation.court.name = reservation.court.name.replace(" \"", "\n\"");
        });
        this.visibleReservations = [...this.reservations];
    }

    getAllReservations(): Promise<Reservation[]> {
        return this.reservationsService.getAllReservations();
    }

    async addNewReservation(reservationName: string): Promise<Reservation> {
        const reservation: Reservation = await this.reservationsService.addNewReservation(reservationName);
        this.reservations = await this.getAllReservations();
        return reservation;
    }

    searchReservations(searchString: string): void {
        this.visibleReservations = this.reservations.filter(reservation =>
            reservation.court.name.toLowerCase().includes(searchString.toLowerCase()) ||
            reservation.court.address.toLowerCase().includes(searchString.toLowerCase()) ||
            reservation.sport.toLowerCase().includes(searchString.toLowerCase()) ||
            reservation.organizer.name.toLowerCase().includes(searchString.toLowerCase()));
    }

    async deleteReservation(id: number): Promise<void> {
        await this.reservationsService.deleteReservation(id);
        this.reservations = await this.getAllReservations();
    }
}
