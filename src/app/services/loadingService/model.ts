export interface LoaderConfig {
  msg?: string;
  progress?: boolean;
  progressMax?: number;
  progressStep?: number;
  opacity?: number;
  spinnerClass?: string;

  debounce?: number;     
  minDuration?: number;  
}