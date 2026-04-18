import { Injectable, signal } from '@angular/core';

interface LoaderMessage {
  id: string;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _loading = signal(false);
  private _messages = signal<LoaderMessage[]>([]);
  private _progress = signal(100);
  private _showProgress = signal(false);
  private _opacity = signal(0.35);
  private _spinnerClass = signal('spinner');

  private debounceDelay = 200; //  Debounce = “Don’t show unless it’s actually slow”, if fast then no flicker
  private minDuration = 500;

  activeRequests = 0;
  private showTimeout: any;
  private startTime = 0;
  private progressInterval: any;

  loading = this._loading.asReadonly();
  messages = this._messages.asReadonly();
  progress = this._progress.asReadonly();
  showProgress = this._showProgress.asReadonly();
  opacity = this._opacity.asReadonly();
  spinnerClass = this._spinnerClass.asReadonly();

  // 🔑 Show returns ID
  show(config?: any): string {
  const id = crypto.randomUUID();
  this.activeRequests++;

  // 👇 override timing if provided
  if (config?.debounce !== undefined) {
    this.debounceDelay = config.debounce;
  }

  if (config?.minDuration !== undefined) {
    this.minDuration = config.minDuration;
  }

  if (config?.opacity !== undefined) {
    this._opacity.set(config.opacity);
  }

  if (config?.spinnerClass) {
    this._spinnerClass.set(config.spinnerClass);
  }

  if (config?.msg) {
    this._messages.update(msgs => [
      ...msgs,
      { id, text: this.sanitize(config.msg) }
    ]);
  }

  if (config?.progress) {
    this.startProgress(config);
  }

  if (this.activeRequests > 1) return id;

  this.clearTimers();

  this.showTimeout = setTimeout(() => {
    if (this.activeRequests > 0) {
      this.startTime = Date.now();
      this._loading.set(true);
    }
  }, this.debounceDelay);

  return id;
}

  hide(id?: string) {
    if (this.activeRequests === 0) return;

    this.activeRequests--;

    if (id) {
      this._messages.update(msgs => msgs.filter(m => m.id !== id));
    }

    if (this.activeRequests > 0) return;

    this.clearTimers();

    const elapsed = Date.now() - this.startTime;
    const remaining = this.minDuration - elapsed;

    const finish = () => {
      this._loading.set(false);
      this.stopProgress();
      this._messages.set([]);
    };

    if (remaining > 0) {
      setTimeout(finish, remaining);
    } else {
      finish();
    }
  }

  hideAll() {
    this.activeRequests = 0;
    this.clearTimers();
    this.stopProgress();
    this._messages.set([]);
    this._loading.set(false);
  }

  // 🧼 Basic sanitisation
  private sanitize(msg: string): string {
    const div = document.createElement('div');
    div.innerText = msg;
    return div.innerHTML;
  }

  // 📉 Progress logic

private startProgress(config: any) {
  console.log('Progress logic');

  this._showProgress.set(true);

  const max = config.progressMax ?? 3000;

  this._progress.set(100); // start at 100%

  const start = Date.now();

  this.progressInterval = setInterval(() => {
    const elapsed = Date.now() - start;

    const remaining = Math.max(max - elapsed, 0);
    const percent = (remaining / max) * 100;

    this._progress.set(percent);

    if (remaining <= 0) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
      this._showProgress.set(false);
    }

  }, 50);
}

  private stopProgress() {
    this._showProgress.set(false);
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  private clearTimers() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }

  setDebounce(ms: number) {
 
  this.debounceDelay = ms;
 
}

setMinDuration(ms: number) {
  this.minDuration = ms;
}
}