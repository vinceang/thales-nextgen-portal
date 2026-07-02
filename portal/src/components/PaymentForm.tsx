import { useState } from "react";
import { Input, Alert } from "../design-system/components";
import type { TFunc } from "../i18n";
import s from "./PaymentForm.module.css";

/* PaymentForm — a demo card-payment form for the Wi-Fi plan checkout. Validates
   FORMAT only (Visa/Mastercard brand, 16 digits, MM/YY expiry not in the past,
   3-digit CVC) — it does NOT process a payment or transmit/store any card data.
   Submits via a shared `formId` so the hosting Modal's footer button can trigger
   it (button type="submit" form={formId}); calls onValidSubmit() when the format
   checks pass. Copy comes from the connect.pay.* dictionary. */

type Brand = "visa" | "mastercard" | null;

// Brand from the leading digits: Visa 4…, Mastercard 51–55 or 2221–2720.
function detectBrand(digits: string): Brand {
  if (/^4/.test(digits)) return "visa";
  if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d\d|27[01]\d|2720)/.test(digits)) return "mastercard";
  return null;
}

const onlyDigits = (v: string) => v.replace(/\D/g, "");
const groupNumber = (v: string) => onlyDigits(v).slice(0, 16).replace(/(.{4})(?=.)/g, "$1 ");
const groupExpiry = (v: string) => {
  const d = onlyDigits(v).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

export interface PaymentFormProps {
  formId: string;
  t: TFunc;
  onValidSubmit: () => void;
}

export function PaymentForm({ formId, t, onValidSubmit }: PaymentFormProps) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const digits = onlyDigits(number);
  const brand = detectBrand(digits);
  const brandLabel = brand === "visa" ? "VISA" : brand === "mastercard" ? "MASTERCARD" : null;

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t("connect.pay.errRequired");

    if (digits.length !== 16) e.number = t("connect.pay.errNumber");
    else if (!brand) e.number = t("connect.pay.errBrand");

    const m = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!m) {
      e.expiry = t("connect.pay.errExpiry");
    } else {
      const mm = Number(m[1]);
      const year = 2000 + Number(m[2]);
      const now = new Date();
      if (mm < 1 || mm > 12) e.expiry = t("connect.pay.errExpiry");
      else if (year < now.getFullYear() || (year === now.getFullYear() && mm < now.getMonth() + 1)) {
        e.expiry = t("connect.pay.errExpired");
      }
    }

    if (!/^\d{3}$/.test(cvc)) e.cvc = t("connect.pay.errCvc");

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) onValidSubmit();
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className={s.form} noValidate>
      <Alert tone="info">{t("connect.pay.demo")}</Alert>

      <div className={s.field}>
        <Input
          label={t("connect.pay.cardName")}
          placeholder={t("connect.pay.cardNamePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        {errors.name && <span className={s.error}>{errors.name}</span>}
      </div>

      <div className={s.field}>
        <Input
          label={t("connect.pay.cardNumber")}
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
          value={number}
          onChange={(e) => setNumber(groupNumber(e.target.value))}
          autoComplete="off"
        />
        <div className={s.numberMeta}>
          <span className={errors.number ? s.error : s.hint}>{errors.number ?? t("connect.pay.accepted")}</span>
          {brandLabel && <span className={s.brand}>{brandLabel}</span>}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <Input
            label={t("connect.pay.expiry")}
            placeholder="MM/YY"
            inputMode="numeric"
            value={expiry}
            onChange={(e) => setExpiry(groupExpiry(e.target.value))}
            autoComplete="off"
          />
          {errors.expiry && <span className={s.error}>{errors.expiry}</span>}
        </div>
        <div className={s.field}>
          <Input
            label={t("connect.pay.cvc")}
            placeholder="123"
            inputMode="numeric"
            value={cvc}
            onChange={(e) => setCvc(onlyDigits(e.target.value).slice(0, 3))}
            autoComplete="off"
          />
          {errors.cvc && <span className={s.error}>{errors.cvc}</span>}
        </div>
      </div>
    </form>
  );
}
