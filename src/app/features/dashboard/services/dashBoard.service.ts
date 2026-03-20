import { inject, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class DashBoardService {

    loading = signal<boolean>(false);
    error = signal<string | null>(null);

    loadDashBoard() {
        this.loading.set(true);
        this.error.set(null);

        setTimeout(() => {
            this.loading.set(false);
        }, 2000)
    }
}