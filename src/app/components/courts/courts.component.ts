import {Component, OnInit} from "@angular/core";
import {CourtsService} from "../../services/courts.service";
import {Court} from "../models/court";

@Component({
    selector: "app-courts",
    templateUrl: "./courts.component.html",
    styleUrls: ["./courts.component.scss"]
})
export class CourtsComponent implements OnInit {
    fileToUpload: File = null;
    courts: Court[] = [];

    constructor(private courtsService: CourtsService) {
    }

    async ngOnInit(): Promise<void> {
        this.courts = await this.getAllCourts();
        this.courts.forEach(court => {
            court.name = court.name.replace(" \"", "\n\"");
            while (court.playgrounds && court.playgrounds.includes(",")) {
                court.playgrounds = court.playgrounds.replace(", ", "\n");
            }
        });
    }

    getAllCourts(): Promise<Court[]> {
        return this.courtsService.getAllCourts();
    }

    async addNewCourt(courtName: string): Promise<Court> {
        const court: Court = await this.courtsService.addNewCourt(courtName);
        this.courts = await this.getAllCourts();
        return court;
    }

    async deleteCourt(id: number): Promise<void> {
        await this.courtsService.deleteCourt(id);
        this.courts = await this.getAllCourts();
    }

    handleFileInput(files: FileList): void {
        this.fileToUpload = files.item(0);
    }
}
