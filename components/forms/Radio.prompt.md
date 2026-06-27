Single-choice control — one option from a mutually-exclusive set.

```jsx
<RadioGroup name="plan" value={plan} onChange={setPlan}
  options={["1 Hour — $9.99", "Full Flight — $19.99", "Streaming — $24.99"]} />

{/* or compose singles */}
<Radio name="seat" value="window" checked={seat==='window'} onChange={setSeat}>Window</Radio>
```

- Circular control (a radio is conventionally round) — hairline ring on the dark fill, highlight-blue ring + filled blue dot when selected.
- Use `RadioGroup` for a list; use single `Radio`s with a shared `name` when laying them out manually. For on/off use `Toggle`; for multi-select use `Checkbox`.
