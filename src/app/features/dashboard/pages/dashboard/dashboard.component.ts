import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Spinner } from "../../../../shared/components/spinner/spinner.component";
import { DashBoardService } from '../../services/dashBoard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    Spinner
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  private dashBoardService = inject(DashBoardService);

  loading = this.dashBoardService.loading;
  error = this.dashBoardService.error;
  dashBoard = this.dashBoardService.loadDashBoard;

  ngOnInit(): void {
    this.dashBoardService.loadDashBoard();
  }

}
