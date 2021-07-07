import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Reservation} from "../components/models/reservation";

@Injectable({
    providedIn: "root"
})
export class ReservationsService {
    private reservationsUrl: string = `${environment.api}/reservations`;

    constructor(private http: HttpClient) {
    }

    async getReservation(id: number): Promise<Reservation> {
        return await this.http.get(`${this.reservationsUrl}/${id}`).toPromise() as Reservation;
    }

    async editReservation(id: number, reservation: Reservation): Promise<Reservation> {
        return await this.http.put(`${this.reservationsUrl}/${id}`, reservation).toPromise() as Reservation;
    }

    async deleteReservation(id: number): Promise<void> {
        await this.http.delete(`${this.reservationsUrl}/${id}`).toPromise();
    }

    async getAllReservations(): Promise<Reservation[]> {
        return await this.http.get(this.reservationsUrl).toPromise() as Reservation[];
    }

    async addNewReservation(reservationName: string): Promise<Reservation> {
        return await this.http.post(this.reservationsUrl, {name: reservationName}).toPromise() as Reservation;
    }
}
