import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { slideToLeftOut} from '../../utility/animation';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  animations: [slideToLeftOut]
})
export class AboutUsComponent implements OnInit {
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
          }, 400
        )

      });
  }

}
