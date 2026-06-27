Click-triggered floating panel — richer than a Tooltip (a menu, a mini-form, details).

```jsx
<Popover trigger={<IconButton label="Profile"><Icon name="user" /></IconButton>} align="end">
  {({ close }) => (
    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
      <Link variant="standalone">My Trips</Link>
      <Link variant="standalone" onClick={close}>Sign Out</Link>
    </div>
  )}
</Popover>
```

- Flat dark `surface-2` panel, hairline border, sharp corners — no shadow. Opens on click; closes on outside-click or Esc.
- `align` follows the inline axis (`end` for a right-anchored nav menu) so it mirrors under RTL. `children` can be a render-prop that receives `{ close }`.
- For a plain text hint use `Tooltip`; for a focus-trapping blocking dialog use `Modal`.
