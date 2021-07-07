import {Court} from "./court";
import {User} from "./user";

export class Reservation {
    id: string;
    court: Court;
    organizer: User;
    time: string;
    sport: string;
    numberOfUsers: number;
}
