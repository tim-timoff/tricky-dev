import { Component, OnInit } from '@angular/core';
import logger from '../../../../src/logger';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent implements OnInit{

  ngOnInit(): void {
    logger.debug(`Landing component initialized`);
  }
}
