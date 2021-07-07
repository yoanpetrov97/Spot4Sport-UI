import {Component, OnInit} from "@angular/core";
import {Event} from "../models/event";
import {EventsService} from "../../services/events.service";

@Component({
    selector: "app-events",
    templateUrl: "./events.component.html",
    styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {
    events: Event[] = [];
    visibleEvents: Event[] = [];

    constructor(private eventsService: EventsService) {
    }

    async ngOnInit(): Promise<void> {
        this.events = await this.getAllEvents();
        this.visibleEvents = [...this.events];
    }

    getAllEvents(): Promise<Event[]> {
        return this.eventsService.getAllEvents();
    }

    async addNewEvent(eventName: string): Promise<Event> {
        const event: Event = await this.eventsService.addNewEvent(eventName);
        this.events = await this.getAllEvents();
        return event;
    }

    searchEvents(searchString: string): void {
        this.visibleEvents = this.events.filter(event =>
            event.court.name.toLowerCase().includes(searchString.toLowerCase()) ||
            event.court.address.toLowerCase().includes(searchString.toLowerCase()) ||
            event.sport.toLowerCase().includes(searchString.toLowerCase()) ||
            event.organizer.name.toLowerCase().includes(searchString.toLowerCase()));
    }

    async deleteEvent(id: number): Promise<void> {
        await this.eventsService.deleteEvent(id);
        this.events = await this.getAllEvents();
    }
}
