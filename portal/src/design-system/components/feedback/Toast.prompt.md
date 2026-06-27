Transient, floating confirmation that auto-dismisses (payment received, added to list).

```jsx
<ToastViewport placement="bottom-end">
  <Toast tone="success" title="Payment received" action="View plan" onAction={open} onClose={close}>
    Streaming pass active until landing.
  </Toast>
</ToastViewport>
```

- Same icon-driven status as `Alert` (one hue) but elevated on the **black** overlay tone with a hairline border — no shadow. At most one action link.
- Drop Toasts into a `ToastViewport` fixed to a corner; it stacks them with a 12px gap and mirrors under RTL (`bottom-end` default).
- Keep them short and self-dismissing. For persistent in-page context use `Alert`.
