import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormConfig } from '../types/form-config';
import { Model } from '../types/model';
import { Color } from '../types/color';
import { Config } from '../types/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = new BehaviorSubject<FormConfig>({} as FormConfig);
  public config$ = this.config.asObservable();
  constructor() { }

  setModel(model: Model): void {
    this.config.next({ ... this.config.value, model: model });
  }
  setColor(color: Color): void {
    this.config.next({ ... this.config.value, color: color });

  }
  setConfig(config: Config): void {
    this.config.next({ ... this.config.value, config: config });
  }
  setTowHitch(towHitch: boolean): void {
    this.config.next({ ... this.config.value, towHitch: towHitch });
  }
  setYoke(yoke: boolean): void {
    this.config.next({ ... this.config.value, yoke: yoke });
  }

  isModelAndColorSelected() {
    const conf = this.config.value;
    if (conf.model && conf.color) {
      return true;
    } else {
      return false;
    }
  }
  isConfSelected() {
    const conf = this.config.value;
    if (conf.config) {
      return true;
    } else {
      return false;
    }
  }
  reset(): void {
    const conf = this.config.value;
    conf.config = undefined as unknown as Config;
    conf.towHitch = false;
    conf.yoke = false;
    this.config.next(conf);
  }
}
