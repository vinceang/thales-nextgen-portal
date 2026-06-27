Labelled text field. Label above, flush dark fill, square corners, grey placeholder, blue focus border.

```jsx
<Input label="Email" type="email" placeholder="jane@framer.com" value={v} onChange={set} />
<Input label="City" placeholder="" />
```

- Lay fields in a vertical stack with ~20px gaps. For a Month/Year/CVV row, put three Inputs in a flex/grid row.
- No visible resting border — depth comes from the lighter fill on the dark page.
