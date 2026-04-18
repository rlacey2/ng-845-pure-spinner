import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../services/loadingService/loadingService';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-loader-demo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './loader-demo.component.html',
    styleUrls: ['./loader-demo.component.scss']
})

export class LoaderDemoComponent {

    minDuration = signal(500);
    debounce = signal(200);
    asyncDuration = signal(1500);


    tests = [
        { id: 1, label: 'Fast (no flicker)', desc: 'Debounce prevents loader from flashing on fast calls' },
        { id: 2, label: 'Medium API', desc: 'Standard delay with smooth appearance' },
        { id: 3, label: 'Slow (instant show)', desc: 'No debounce, shows immediately' },
        { id: 4, label: 'Progress bar', desc: 'Displays fake progress countdown' },
        { id: 5, label: 'Parallel requests', desc: 'Multiple requests tracked independently' },
        { id: 6, label: 'Mixed speeds', desc: 'Fast + slow requests combined' },
        { id: 7, label: 'Custom spinner', desc: 'Different spinner + overlay opacity' },
        { id: 8, label: 'Chained steps', desc: 'Sequential operations with message updates' },
        { id: 9, label: 'Cancel all', desc: 'Clears all loaders at once (error case)' },
        { id: 10, label: 'Silent loader', desc: 'Spinner only, no message' },
        { id: 11, label: 'Anti-flicker', desc: 'High debounce + min duration' },
        { id: 12, label: 'Instant feedback', desc: 'No delay, quick response' },
        { id: 13, label: 'Fast progress', desc: 'Quick animated progress bar' },
        { id: 14, label: 'Slow progress', desc: 'Long-running perceived task' },
        { id: 15, label: 'Full config', desc: 'All features combined' }
    ];



    loader = inject(LoadingService)

    constructor() {

        // this.loader.setDebounce(300);
        // this.loader.setMinDuration(700);

        // set global defaults once into the service from the values in signals in the component
        this.syncToService()


    }

    syncToService() {
        this.loader.setDebounce(this.debounce());
        this.loader.setMinDuration(this.minDuration());
    }

    runTest(n: number) {
        this.testCases(n);
    }

    testCases(caseNumber: number) {
        let id: string;

        switch (caseNumber) {
            case 1:
                id = this.loader.show({ msg: 'Loading...', debounce: 300, minDuration: 500 });
                setTimeout(() => this.loader.hide(id), 100);
                break;

            case 2:
                id = this.loader.show({
                    msg: 'Fetching data...', debounce: this.debounce(),
                    minDuration: this.minDuration()
                });
                setTimeout(() => this.loader.hide(id), this.asyncDuration());
                break;

            case 3:
                id = this.loader.show({ msg: 'Processing large dataset...', debounce: 0, minDuration: 800 });
                setTimeout(() => this.loader.hide(id), 1500);
                break;

            case 4:
                id = this.loader.show({
                    msg: 'Uploading file...',
                    progress: true,
                    progressMax: 30000,
                    progressStep: 100,
                    debounce: 200
                });
                setTimeout(() => this.loader.hide(id), this.asyncDuration());
                break;

            case 5:
                const id1 = this.loader.show({ msg: 'Loading users...' });
                const id2 = this.loader.show({ msg: 'Loading orders...' });

                setTimeout(() => this.loader.hide(id1), 1000);
                setTimeout(() => this.loader.hide(id2), 2000);
                break;

            case 6:
                const fastId = this.loader.show({ msg: 'Quick check...', debounce: 300 });
                const slowId = this.loader.show({ msg: 'Heavy query...', debounce: 100 });

                setTimeout(() => this.loader.hide(fastId), 150);
                setTimeout(() => this.loader.hide(slowId), 1200);
                break;

            case 7:
                id = this.loader.show({ msg: 'Custom UI...', spinnerClass: 'spinnerB', opacity: 0.6 });
                setTimeout(() => this.loader.hide(id), 1200);
                break;

            case 8:
                const step1 = this.loader.show({ msg: 'Step 1: Validating...' });

                setTimeout(() => {
                    this.loader.hide(step1);
                    const step2 = this.loader.show({ msg: 'Step 2: Saving...' });
                    setTimeout(() => this.loader.hide(step2), 1000);
                }, 1000);
                break;

            case 9:
                this.loader.show({ msg: 'Alpha...', progress: true, opacity: 0.5 });
                this.loader.show({ msg: 'Beta...', progress: true, opacity: 0.5 });
                this.loader.show({
                    msg: 'Gamma...', progress: true, progressMax: 10000, opacity: 0.5,
                    progressStep: 100
                });
             //   setTimeout(() => this.loader.hideAll(), 10000);
                break;

            case 10:
                id = this.loader.show({ debounce: 200, minDuration: 500 });
                setTimeout(() => this.loader.hide(id), 700);
                break;

            case 11:
                this.loader.setDebounce(400);
                this.loader.setMinDuration(800);

                id = this.loader.show({ msg: 'Loading...' });
                setTimeout(() => this.loader.hide(id), 900);
                break;

            case 12:
                id = this.loader.show({ msg: 'Instant feedback...', debounce: 0, minDuration: 300 });
                setTimeout(() => this.loader.hide(id), 200);
                break;

            case 13:
                id = this.loader.show({
                    msg: 'Quick progress...',
                    progress: true,
                    progressMax: 2000,
                    progressStep: 50
                });
                setTimeout(() => this.loader.hide(id), 1500);
                break;

            case 14:
                id = this.loader.show({
                    msg: 'Preparing environment...',
                    progress: true,
                    progressMax: 8000,
                    progressStep: 200
                });
                setTimeout(() => this.loader.hide(id), 5000);
                break;

            case 15:
                id = this.loader.show({
                    msg: 'Processing request...',
                    debounce: 250,
                    minDuration: 700,
                    progress: true,
                    progressMax: 6000,
                    progressStep: 100,
                    spinnerClass: 'spinnerA',
                    opacity: 0.5
                });
                setTimeout(() => this.loader.hide(id), 4000);
                break;

            default:
                console.warn('Invalid test case');
        }
    }

    updateDebounce(event: Event) {
        const value = (event.target as HTMLInputElement).valueAsNumber;
        this.debounce.set(value);
        this.loader.setDebounce(value);
    }

    updateMinDuration(event: Event) {
        const value = (event.target as HTMLInputElement).valueAsNumber;
        this.minDuration.set(value);
        this.loader.setMinDuration(value);
    }

        updateAsyncDuration(event: Event) {
        const value = (event.target as HTMLInputElement).valueAsNumber;
        this.asyncDuration.set(value);
        // loader not relevant to this
    }


 

}