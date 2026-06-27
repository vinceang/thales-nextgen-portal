Identity mark for a passenger or a content source.

```jsx
<Avatar name="Vincent Ang" />
<Avatar src="/img/profile.jpg" name="Vincent Ang" size="lg" />
<Avatar size="sm" shape="circle" />
```

- Renders, in priority: image → two-letter initials → a line `user` glyph.
- **Square by default** (`--radius-card`) to stay on-brand with the sharp skin; use `shape="circle"` only where a round profile mark is genuinely wanted.
- Sizes `sm`/`md`/`lg` or an explicit px. Fill on dark `surface-3` with a hairline border — no shadow, no second hue.
