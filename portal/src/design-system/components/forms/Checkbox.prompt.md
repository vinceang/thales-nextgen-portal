Square checkbox with an inline label. Unchecked = dark fill + hairline; checked = blue fill + white check.

```jsx
<Checkbox checked={agree} onChange={setAgree}>
  I have read and agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Notice</a>.
</Checkbox>
```

- Links inside the label use bright-blue. Used on the payment form's consent row.
