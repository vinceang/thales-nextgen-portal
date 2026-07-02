import type { ReactNode } from "react";
import { Modal, Button } from "../design-system/components";
import { PaymentForm } from "./PaymentForm";
import type { TFunc } from "../i18n";

/* CheckoutModal — the shared purchase flow for any Product (Wi-Fi plans and Shop
   items alike, mirroring the original portal's single payment flow). Wraps the DS
   Modal with an optional summary line + the format-only PaymentForm; the footer's
   Pay button submits the form (via `form=`), and onPaid fires only when the
   format checks pass. The form remounts each open, so fields reset between
   purchases. Demo only — nothing is charged or stored. */

const FORM_ID = "checkout-payment";

export interface CheckoutModalProps {
  open: boolean;
  title: string;
  /** Line(s) above the form, e.g. an order summary. */
  summary?: ReactNode;
  /** Pay button label, e.g. "Pay $3.50". */
  payLabel: string;
  onClose: () => void;
  /** Fired when the payment form's format validation passes. */
  onPaid: () => void;
  t: TFunc;
}

export function CheckoutModal({ open, title, summary, payLabel, onClose, onPaid, t }: CheckoutModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      width={460}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>{t("connect.cancel")}</Button>
          <Button type="submit" form={FORM_ID}>{payLabel}</Button>
        </>
      }
    >
      {summary}
      <PaymentForm formId={FORM_ID} t={t} onValidSubmit={onPaid} />
    </Modal>
  );
}
