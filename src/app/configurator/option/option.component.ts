import { Component, OnInit, inject } from '@angular/core';
import { TeslaService } from '../../services/tesla.service';
import { ConfigService } from '../../services/config.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Config } from '../../types/config';
import { take } from 'rxjs';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss'
})
export class OptionComponent implements OnInit {
  public configs: Config[] = [];
  private readonly teslaService = inject(TeslaService);
  private readonly configService = inject(ConfigService);

  #selectedOption!: Config;
  #towHitch: boolean;
  #yoke: boolean;
  public showTowHitch: boolean;
  public showYoke: boolean;

  constructor() {
    this.#selectedOption = {} as Config;
    this.#towHitch = false;
    this.#yoke = false;
    this.showTowHitch = false;
    this.showYoke = false;
  }
  ngOnInit(): void {

    this.configService.config$.pipe(take(1)).subscribe(conf => {

      this.#towHitch = conf.towHitch;
      this.#yoke = conf.yoke;
      this.selectedOption = conf.config as Config;

      this.teslaService.getOptions(conf.model.code).pipe(take(1)).subscribe(options => {
        this.configs = options.configs;
        this.showTowHitch = options.towHitch;
        this.showYoke = options.yoke;
      })
    });

  }
  get selectedOption(): Config {
    return this.#selectedOption;
  }
  set selectedOption(config: Config) {
    this.configService.setConfig(config);
    this.#selectedOption = config;
  }

  set towHitch(val: boolean) {
    this.#towHitch = val;
    this.configService.setTowHitch(val);
  }
  get towHitch(): boolean {
    return this.#towHitch;
  }

  get yoke(): boolean {
    return this.#yoke;
  }
  set yoke(val: boolean) {
    this.#yoke = val;
    this.configService.setYoke(val);
  }
}
