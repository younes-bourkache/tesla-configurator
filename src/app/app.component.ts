import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ImageComponent } from './configurator/image/image.component';
import { ConfigService } from './services/config.service';

@Component({
    selector: 'app-root',
    standalone: true,
    styleUrl: './app.component.scss',
    templateUrl: './app.component.html',
    imports: [RouterOutlet, ImageComponent, RouterLink, CommonModule]
})
export class AppComponent {
    private readonly configService = inject(ConfigService);
    get modelSelected() {
      return this.configService.isModelAndColorSelected();
    }
    get confSelected() {
      return this.configService.isConfSelected();
    }
}
