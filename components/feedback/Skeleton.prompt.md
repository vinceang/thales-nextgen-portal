Layout-reserving placeholder shown while posters / tiles / lists load.

```jsx
<Skeleton variant="block" height={180} />        {/* poster */}
<Skeleton variant="text" lines={3} />            {/* headline + meta */}
<Skeleton variant="circle" width={40} height={40} />
```

- Pulses gently (`ds-pulse`) on `surface-3` — no shimmer-gradient sweep, no second hue. Square (`--radius-card`) to match the surface it stands in; `circle` for avatars.
- Mirror the real layout's sizes so nothing shifts when data arrives. For an active indeterminate action use `Spinner`/`ProgressBar` instead.
