import { Component, OnInit, inject } from '@angular/core';
import { FormConfig } from '../../types/form-config';
import { ConfigService } from '../../services/config.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  public conf: FormConfig = null as unknown as FormConfig;
  private readonly configService: ConfigService = inject(ConfigService);
  private towHitchPrice = 1000;
  private yokePrice = 1000;
  constructor() {
  }
  ngOnInit() {
    this.configService.config$.subscribe(conf => this.conf = conf);
  }
  get calculateTotal() {
    let total = 0;
    total += this.conf.config.price;
    total += this.conf.color.price;
    total += this.conf.towHitch ? this.towHitchPrice : 0;
    total += this.conf.yoke ? this.yokePrice : 0;
     return total;
  }
}
