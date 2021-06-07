import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, interval } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { slideToLeftOut, fadeInOut, slideIn } from '../../utility/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideToLeftOut, fadeInOut, slideIn]
})
export class HomeComponent implements OnInit, OnDestroy {
    
  images: string[] = ['main-banner.jpg', 'main-banner2.jpg', 'main-banner3.jpg'];
  currentImg: number = 0;
  sub: Subscription;
  switching = false;
  imageServer = environment.resourceServer;
  constructor() { }

  ngOnInit() {
    this.sub = interval(5000)
      .subscribe(() => {
        this.switching = true;
        this.currentImg = (this.currentImg + 1) % 3;
        setTimeout(
          () => {
            
            this.switching = false;
          },400
        )
        
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }



}
