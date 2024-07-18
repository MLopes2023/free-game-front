import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/servicos/loanding.service';

@Component({
  selector: 'app-loanding',
  templateUrl: './loanding.component.html',
  styleUrls: ['./loanding.component.css']
})
export class LoandingComponent {

  loading = this.loadingService.loading$;
  
  constructor(private loadingService: LoadingService) {}

}
