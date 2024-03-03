import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Model } from '../../types/model';
import { TeslaService } from '../../services/tesla.service';
import { Color } from '../../types/color';
import { ConfigService } from '../../services/config.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss'
})
export class ModelComponent implements OnInit{
  public models: Model[] = [];
  #selectedModel!: Model;
  #selectedColor: Color;
  private readonly teslaService: TeslaService = inject(TeslaService);
  private readonly configService: ConfigService = inject(ConfigService);
  constructor() {
    this.#selectedModel = {} as Model;
    this.#selectedColor = {} as Color;
  }
  
  ngOnInit(): void {
    this.configService.config$.pipe(take(1)).subscribe(conf => {
      this.#selectedModel = conf.model as Model;
      this.#selectedColor = conf.color as Color;
    });
    this.teslaService.getModels().pipe(take(1)).subscribe(models =>
      this.models = models as Model[]);
  }

  set selectedModel(model: Model) {
    this.#selectedModel = model;
    this.configService.setModel(this.selectedModel);
    if (model) {
      this.selectedColor = this.selectedModel.colors[0];
    } else {
      this.selectedColor = null as unknown as Color;
    }
    this.configService.reset();
  }

  set selectedColor(color: Color) {
    this.#selectedColor = color;
    this.configService.setColor(this.selectedColor);
  }
  get selectedModel(): Model {
    return this.#selectedModel;
  }
  get selectedColor(): Color {
    return this.#selectedColor;
  }
}
