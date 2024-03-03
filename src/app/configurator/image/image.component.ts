import { Component, inject } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {

  public src: string = '';
  public alt: string = '';
  private endPoint = 'https://interstate21.com/tesla-app/images/';
  private readonly configService = inject(ConfigService);

  constructor() {
  }

  get url() {
    this.configService.config$.pipe(take(1)).subscribe(conf => {
      this.src = this.endPoint + conf.model.code + '/' + conf.color.code + '.jpg';
      this.alt = conf.model.description + ' - ' + conf.color.description;
    }
    );
    return this.src;
  }
}
