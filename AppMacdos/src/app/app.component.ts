import { Component } from '@angular/core';
import { RequestService } from './request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private ListMacdos

  constructor(private requestService: RequestService) {
  }

  ngOnChanges(): void {
    console.log("OnChanges");
  }

  private onKey(value: string): void {
    if (value.length ===2) {
      value= value.toUpperCase()
    }
    this.requestService.getListMacdos(value)
      .subscribe((ListMacdos) => {
        this.ListMacdos = Array(ListMacdos)[0]
      });
  }
}


