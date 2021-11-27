import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})

export class AboutPage implements OnInit {

  topicName = 'news';

  slideOpts = {
    initialSlide: 0,
    speed: 1000,
  };

  constructor() { }

  async ngOnInit() {

  }
}
