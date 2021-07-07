import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../components/models/user";

@Injectable({
    providedIn: "root"
})
export class UsersService {
    private usersUrl: string = `${environment.api}/persons`;

    constructor(private http: HttpClient) {
    }

    async getUser(id: number): Promise<User> {
        return await this.http.get(`${this.usersUrl}/${id}`).toPromise() as User;
    }

    async editUser(id: number, user: User): Promise<User> {
        return await this.http.put(`${this.usersUrl}/${id}`, user).toPromise() as User;
    }

    async deleteUser(id: number): Promise<void> {
        await this.http.delete(`${this.usersUrl}/${id}`).toPromise();
    }

    async getAllUsers(): Promise<User[]> {
        return await this.http.get(this.usersUrl).toPromise() as User[];
    }

    async addNewUser(userName: string): Promise<User> {
        return await this.http.post(this.usersUrl, {name: userName}).toPromise() as User;
    }
}
