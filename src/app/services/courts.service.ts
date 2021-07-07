import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Court} from "../components/models/court";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class CourtsService {
    private courtsUrl: string = `${environment.api}/courts`;

    constructor(private http: HttpClient) {
    }

    async getCourt(id: number): Promise<Court> {
        return await this.http.get(`${this.courtsUrl}/${id}`).toPromise() as Court;
    }

    async editCourt(id: number, court: Court): Promise<Court> {
        return await this.http.put(`${this.courtsUrl}/${id}`, court).toPromise() as Court;
    }

    async deleteCourt(id: number): Promise<void> {
        await this.http.delete(`${this.courtsUrl}/${id}`).toPromise();
    }

    async getAllCourts(): Promise<Court[]> {
        return await this.http.get(this.courtsUrl).toPromise() as Court[];
    }

    async addNewCourt(courtName: string): Promise<Court> {
        return await this.http.post(this.courtsUrl, {name: courtName}).toPromise() as Court;
    }
}
