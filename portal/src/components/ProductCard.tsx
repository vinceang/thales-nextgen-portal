import { Button } from "../design-system/components";
import s from "./ProductCard.module.css";

/* ProductCard — an onboard-store product cell: image, name, blurb, price + Buy.
   Presentational; the consumer owns onBuy (which opens the shared CheckoutModal). */
export interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  blurb?: string;
  buyLabel: string;
  onBuy: () => void;
}

export function ProductCard({ image, name, price, blurb, buyLabel, onBuy }: ProductCardProps) {
  return (
    <article className={s.card}>
      <div className={s.coverWrap}>
        <img className={s.cover} src={image} alt="" loading="lazy" />
      </div>
      <div className={s.body}>
        <h3 className={s.name}>{name}</h3>
        {blurb && <p className={s.blurb}>{blurb}</p>}
        <div className={s.foot}>
          <span className={s.price}>{price}</span>
          <Button size="sm" onClick={onBuy}>{buyLabel}</Button>
        </div>
      </div>
    </article>
  );
}
