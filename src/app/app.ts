import { Component } from '@angular/core';
import { LoaderDemoComponent } from './demo/loader-demo.component';
import { LoaderComponent } from './services/loadingService/loading';
 
@Component({
  standalone: true,
    selector: 'app-root',
  
  imports: [LoaderDemoComponent, LoaderComponent],
  templateUrl: './app.html'
})
export class AppComponent {}