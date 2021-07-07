import {Court} from "./court";
import {User} from "./user";

export class Event {
    id: string;
    name: string;
    court: Court;
    organizer: User;
    time: string;
    sport: string;
    numberOfUsers: number;
}
