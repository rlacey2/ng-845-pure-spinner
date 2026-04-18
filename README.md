# Angular Standalone Pure Spinner Loading Overlay

Generated via chatGPT interactions.

If ngx-spinner isn’t working in your Angular standalone app, it’s usually one of a few common issues. Standalone setup changes how modules/providers are wired, so some older examples don’t apply directly.

In Angular versions (v17+), provideAnimations() is deprecated, which is why ngx-spinner can silently fail if you follow older examples.



Since you're using standalone components, you must import the module inside the component, not in AppModule:


via a config options

| Feature          | Purpose               |
| ---------------- | --------------------- |
| debounce         | avoid flicker         |
| minDuration      | avoid abrupt hide     |
| messages         | user context          |
| progress         | perceived performance |
| request tracking | correctness           |
| opacity          | visual control        |
| spinnerClass     | theming               |
