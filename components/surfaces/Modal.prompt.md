Centered blocking dialog for a focused decision (confirm purchase, terms, sign-in).

```jsx
<Modal open={open} onClose={close} title="Confirm Purchase"
  footer={<><Button variant="secondary" onClick={close}>Cancel</Button>
            <Button onClick={pay}>Pay $19.99</Button></>}>
  Full-flight streaming, charged once to the card ending 4242.
</Modal>
```

- Dim **black** backdrop at 70% (no frosted blur), centered panel on dark `surface-2`, hairline border, sharp corners, flat. Serif title; body scrolls; footer actions at the inline-end.
- Closes on Esc and backdrop click. Keep to one primary + one secondary action. For an edge panel (filters, cart) use `Drawer`; for a small anchored panel use `Popover`.
