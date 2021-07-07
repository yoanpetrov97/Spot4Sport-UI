import {Component, OnInit} from "@angular/core";
import {User} from "../models/user";
import {UsersService} from "../../services/users.service";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    visibleUsers: User[] = [];

    constructor(private usersService: UsersService) {
    }

    async ngOnInit(): Promise<void> {
        this.users = await this.getAllUsers();
        this.users.forEach(user => {
            user.name = user.name.replace(" \"", "\n\"");
            while (user.sports && user.sports.includes(",")) {
                user.sports = user.sports.replace(", ", "\n");
            }
        });
        this.visibleUsers = [...this.users];
    }

    getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    async addNewUser(userName: string): Promise<User> {
        const user: User = await this.usersService.addNewUser(userName);
        this.users = await this.getAllUsers();
        return user;
    }

    searchUsers(searchString: string): void {
        this.visibleUsers = this.users.filter(user =>
            user.name.toLowerCase().includes(searchString.toLowerCase()) ||
            user.sports.toLowerCase().includes(searchString.toLowerCase()));
    }

    async deleteUser(id: number): Promise<void> {
        await this.usersService.deleteUser(id);
        this.users = await this.getAllUsers();
    }
}
