import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from './loadingService';
 
@Component({
  selector: 'ng-smart-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.html',

  styleUrls: ['./loading.scss']
})
export class LoaderComponent {
  private loader = inject(LoadingService);

  loading = this.loader.loading;
  messages = this.loader.messages;
  progress = this.loader.progress;
  showProgress = this.loader.showProgress;
  opacity = this.loader.opacity;
  spinnerClass = this.loader.spinnerClass;
}