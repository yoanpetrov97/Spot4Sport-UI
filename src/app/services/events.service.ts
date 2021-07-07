import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Event} from "../components/models/event";

@Injectable({
    providedIn: "root"
})
export class EventsService {
    private eventsUrl: string = `${environment.api}/events`;

    constructor(private http: HttpClient) {
    }

    async getEvent(id: number): Promise<Event> {
        return await this.http.get(`${this.eventsUrl}/${id}`).toPromise() as Event;
    }

    async editEvent(id: number, event: Event): Promise<Event> {
        return await this.http.put(`${this.eventsUrl}/${id}`, event).toPromise() as Event;
    }

    async deleteEvent(id: number): Promise<void> {
        await this.http.delete(`${this.eventsUrl}/${id}`).toPromise();
    }

    async getAllEvents(): Promise<Event[]> {
        return await this.http.get(this.eventsUrl).toPromise() as Event[];
    }

    async addNewEvent(eventName: string): Promise<Event> {
        return await this.http.post(this.eventsUrl, {name: eventName}).toPromise() as Event;
    }
}
