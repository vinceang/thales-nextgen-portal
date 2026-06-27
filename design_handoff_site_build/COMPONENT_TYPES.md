# Component Types Reference

TypeScript prop signatures for every component in the design system, aggregated from the original `.d.ts` files. Use these for prop names, types, and defaults when calling components. Per-component usage rules and examples live in each component's sibling `.prompt.md`.

> The components ship as `.jsx`. If you want first-class type-checking in your app, fold the relevant interface below into a sibling `.d.ts` or convert the component to `.tsx`.

---

## core

### Avatar  
<sub>`components/core/Avatar.jsx`</sub>

```ts
import * as React from "react";

/**
 * Identity mark for a passenger or content source. Sharp by default; falls back
 * image → initials → user glyph.
 */
export interface AvatarProps {
  /** Image URL. If absent, initials from `name`, else a line user glyph. */
  src?: string;
  /** Full name — drives initials and the image alt text. */
  name?: string;
  /** Preset `sm`(28) | `md`(40) | `lg`(56), or an explicit pixel number. */
  size?: "sm" | "md" | "lg" | number;
  /** `square` (radius-card, on-brand default) | `circle` (radius-pill). */
  shape?: "square" | "circle";
  style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps): JSX.Element;
```

### Badge  
<sub>`components/core/Badge.jsx`</sub>

```ts
import * as React from "react";

/**
 * Small sharp status / count label. Monochrome + blue only — status meaning is
 * carried by an icon or label, never a second hue.
 */
export interface BadgeProps {
  /** `neutral` (surface fill) | `accent` (blue fill) | `outline` (hairline). */
  tone?: "neutral" | "accent" | "outline";
  /** Render a tiny standalone status dot instead of a labelled tag. */
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
```

### Button  
<sub>`components/core/Button.jsx`</sub>

```ts
import * as React from "react";

/**
 * Primary/secondary action button with an uppercase Montserrat label and sharp corners.
 */
export interface ButtonProps {
  /** Visual style. Primary = highlight-blue fill for the single most important action. */
  variant?: "primary" | "secondary";
  /** Control size. */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
```

### Chip  
<sub>`components/core/Chip.jsx`</sub>

```ts
import * as React from "react";

/**
 * Compact sharp token for an applied filter / selected value / tag. For the
 * rounded category filter use GenrePill instead — that is the one rounded shape.
 */
export interface ChipProps {
  /** Selected state — solid highlight-blue fill. */
  selected?: boolean;
  /** When provided, renders a trailing × dismiss control. */
  onRemove?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  /** Optional leading element (small icon / avatar). */
  leading?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Chip(props: ChipProps): JSX.Element;
```

### GenrePill  
<sub>`components/core/GenrePill.jsx`</sub>

```ts
import * as React from "react";

export interface GenrePillProps {
  /** Active pill = solid highlight-blue fill. */
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Rounded category/topic filter chip (the only pill shape in the system). */
export function GenrePill(props: GenrePillProps): JSX.Element;
```

### Icon  
<sub>`components/core/Icon.jsx`</sub>

```ts
import * as React from "react";

export type IconName =
  | "menu" | "home" | "search" | "wifi" | "user" | "x"
  | "plane" | "chevron-right" | "chevron-left" | "chevron-down"
  | "mountain" | "gauge" | "navigation" | "clock"
  | "sun" | "cloud" | "cloud-sun" | "cloud-rain"
  | "moon" | "cloud-moon" | "wind"
  | "check" | "eye" | "credit-card";

export interface IconProps {
  /** Glyph name. */
  name: IconName;
  /** Pixel size. Default 22. */
  size?: number;
  strokeWidth?: number;
  color?: string;
  style?: React.CSSProperties;
}

/** Thin single-weight line icon (Lucide-equivalent) used throughout the portal. */
export function Icon(props: IconProps): JSX.Element;
```

### IconButton  
<sub>`components/core/IconButton.jsx`</sub>

```ts
import * as React from "react";

export interface IconButtonProps {
  /** Accessible label (aria-label). */
  label: string;
  /** Active state colors the glyph bright-blue (e.g. live Wi-Fi). */
  active?: boolean;
  /** Glyph pixel size. Default 22. */
  size?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** The icon SVG (e.g. a Lucide glyph). */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Borderless square icon button for the nav bar and small controls. */
export function IconButton(props: IconButtonProps): JSX.Element;
```

### Kicker  
<sub>`components/core/Kicker.jsx`</sub>

```ts
import * as React from "react";

export interface KickerProps {
  /** Render with an underline (the "kicker 2" link treatment). */
  underline?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Bright-blue uppercase action label that sits above a serif tile/card title. */
export function Kicker(props: KickerProps): JSX.Element;
```

### Link  
<sub>`components/core/Link.jsx`</sub>

```ts
import * as React from "react";

/**
 * Text hyperlink. `inline` = bright-blue body link (underline on hover);
 * `standalone` = uppercase Montserrat action link with optional chevron.
 */
export interface LinkProps {
  href?: string;
  /** `inline` body link | `standalone` uppercase action link. */
  variant?: "inline" | "standalone";
  /** Show a trailing chevron (mirrors under RTL). */
  arrow?: boolean;
  /** Open in a new tab + rel=noopener. */
  external?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Link(props: LinkProps): JSX.Element;
```

### Spinner  
<sub>`components/core/Spinner.jsx`</sub>

```ts
import * as React from "react";

/**
 * Indeterminate loading ring — hairline track, highlight-blue arc.
 */
export interface SpinnerProps {
  /** Diameter in px. Default 28. */
  size?: number;
  /** Ring stroke width in px. Default 3. */
  thickness?: number;
  /** Optional inline caption shown after the ring (and used as aria-label). */
  label?: string;
  style?: React.CSSProperties;
}

export function Spinner(props: SpinnerProps): JSX.Element;
```

---

## forms

### Checkbox  
<sub>`components/forms/Checkbox.jsx`</sub>

```ts
import * as React from "react";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Inline label content (may contain links). */
  children?: React.ReactNode;
  /** Box size in px. Default 24. */
  size?: number;
  style?: React.CSSProperties;
}

/** Square checkbox with inline label — blue fill + white check when checked. */
export function Checkbox(props: CheckboxProps): JSX.Element;
```

### DatePicker  
<sub>`components/forms/DatePicker.jsx`</sub>

```ts
import * as React from "react";

/**
 * Labelled date field that opens a sharp calendar panel — month nav, 7-column
 * day grid, highlight-blue selected day, hairline today ring. Flat (no shadow).
 */
export interface DatePickerProps {
  label?: string;
  id?: string;
  /** Selected date (Date | null). */
  value?: Date | null;
  /** Called with the chosen Date. */
  onChange?: (date: Date) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

export function DatePicker(props: DatePickerProps): JSX.Element;
```

### Input  
<sub>`components/forms/Input.jsx`</sub>

```ts
import * as React from "react";

export interface InputProps {
  /** Field label rendered above the input. */
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Style for the outer wrapper. */
  style?: React.CSSProperties;
  /** Style for the <input> itself. */
  inputStyle?: React.CSSProperties;
}

/** Labelled text field — flush dark fill, square corners, blue focus border. */
export function Input(props: InputProps): JSX.Element;
```

### Radio  
<sub>`components/forms/Radio.jsx`</sub>

```ts
import * as React from "react";

/** Single circular radio choice with inline label. */
export interface RadioProps {
  checked?: boolean;
  /** (value, event) => void */
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  size?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Radio(props: RadioProps): JSX.Element;

/** Vertical group of radios sharing one selection. */
export interface RadioGroupProps {
  name?: string;
  /** string[] or {value,label}[] */
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Gap between options in px. Default 16. */
  gap?: number;
  style?: React.CSSProperties;
}
export function RadioGroup(props: RadioGroupProps): JSX.Element;
```

### Search  
<sub>`components/forms/Search.jsx`</sub>

```ts
import * as React from "react";

/**
 * Search field — leading magnifier, clear (×) once there's a query, blue focus.
 */
export interface SearchProps {
  value?: string;
  /** (value, event) => void */
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement> | null) => void;
  /** Optional explicit clear handler; defaults to onChange(""). */
  onClear?: () => void;
  /** Submit handler (Enter). Receives the current value. */
  onSubmit?: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  /** `md` (default) | `lg` for the nav-bar search overlay. */
  size?: "md" | "lg";
  style?: React.CSSProperties;
}

export function Search(props: SearchProps): JSX.Element;
```

### Select  
<sub>`components/forms/Select.jsx`</sub>

```ts
import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  id?: string;
  /** Placeholder option shown in grey when nothing is chosen. */
  placeholder?: string;
  /** Options as strings or { value, label }. */
  options?: (string | SelectOption)[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
}

/** Labelled dropdown matching the Input fill, with a chevron and grey placeholder. */
export function Select(props: SelectProps): JSX.Element;
```

### TextArea  
<sub>`components/forms/TextArea.jsx`</sub>

```ts
import * as React from "react";

/**
 * Multi-line text field. Same dark fill / sharp corners / blue focus as Input.
 */
export interface TextAreaProps {
  label?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Initial visible rows. Default 4. The field is vertically resizable. */
  rows?: number;
  /** Caps input and shows an N/max counter. */
  maxLength?: number;
  /** Helper text under the field. */
  helper?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

export function TextArea(props: TextAreaProps): JSX.Element;
```

### Toggle  
<sub>`components/forms/Toggle.jsx`</sub>

```ts
import * as React from "react";

/**
 * On/off switch. Rounded track + knob (an allowed rounded shape). Highlight-blue
 * when on. The knob travels along the inline axis, so it mirrors under RTL.
 */
export interface ToggleProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** Label after the switch (or pass children). */
  label?: string;
  /** Track height in px (width is 1.8×). Default 26. */
  size?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Toggle(props: ToggleProps): JSX.Element;
```

---

## feedback

### Alert  
<sub>`components/feedback/Alert.jsx`</sub>

```ts
import * as React from "react";

/**
 * Inline status banner. Status is shown by the icon, not colour (the system has
 * one hue). Flat — dark surface, hairline border, no left accent bar, no shadow.
 */
export interface AlertProps {
  /** Chooses the leading icon: info | success | warning | error. */
  tone?: "info" | "success" | "warning" | "error";
  title?: string;
  /** When provided, renders a dismiss ×. */
  onClose?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Alert(props: AlertProps): JSX.Element;
```

### EmptyState  
<sub>`components/feedback/EmptyState.jsx`</sub>

```ts
import * as React from "react";

/**
 * Centered placeholder for a view with no content yet.
 */
export interface EmptyStateProps {
  /** Line-icon name shown in the hairline ring (default "inbox"). */
  icon?: string;
  title?: string;
  message?: string;
  /** Optional single action node (e.g. a <Button/>). */
  action?: React.ReactNode;
  style?: React.CSSProperties;
}

export function EmptyState(props: EmptyStateProps): JSX.Element;
```

### Popover  
<sub>`components/feedback/Popover.jsx`</sub>

```ts
import * as React from "react";

/**
 * Click-triggered floating panel for richer content than a Tooltip. Flat dark
 * surface; closes on outside click / Esc.
 */
export interface PopoverProps {
  /** The clickable anchor element. */
  trigger: React.ReactNode;
  placement?: "top" | "bottom";
  /** Inline-axis alignment to the trigger (RTL-aware). */
  align?: "start" | "center" | "end";
  width?: number;
  defaultOpen?: boolean;
  /** Node, or a render fn receiving { close }. */
  children?: React.ReactNode | ((api: { close: () => void }) => React.ReactNode);
  style?: React.CSSProperties;
}

export function Popover(props: PopoverProps): JSX.Element;
```

### ProgressBar  
<sub>`components/feedback/ProgressBar.jsx`</sub>

```ts
import * as React from "react";

/**
 * Determinate or indeterminate progress. Hairline track, highlight-blue fill.
 */
export interface ProgressBarProps {
  /** 0..max. Ignored when indeterminate. */
  value?: number;
  max?: number;
  /** Animated sweep when the duration is unknown. */
  indeterminate?: boolean;
  /** Caption above the track. */
  label?: string;
  /** Show a trailing % (determinate only). */
  showValue?: boolean;
  /** Track height in px. Default 6. */
  height?: number;
  style?: React.CSSProperties;
}

export function ProgressBar(props: ProgressBarProps): JSX.Element;
```

### Skeleton  
<sub>`components/feedback/Skeleton.jsx`</sub>

```ts
import * as React from "react";

/**
 * Pulsing placeholder that reserves layout while content loads.
 */
export interface SkeletonProps {
  /** `text` (one or more lines) | `block` (tile/poster) | `circle` (avatar). */
  variant?: "text" | "block" | "circle";
  /** CSS width (e.g. 200 or "100%"). */
  width?: number | string;
  /** CSS height. */
  height?: number | string;
  /** For variant="text": number of lines (last is shortened). */
  lines?: number;
  /** Gap between text lines in px. */
  gap?: number;
  style?: React.CSSProperties;
}

export function Skeleton(props: SkeletonProps): JSX.Element;
```

### Toast  
<sub>`components/feedback/Toast.jsx`</sub>

```ts
import * as React from "react";

/** Transient floating notification. Icon-driven status (one hue), flat on black. */
export interface ToastProps {
  tone?: "info" | "success" | "warning" | "error";
  title?: string;
  /** Optional single action label (uppercase link). */
  action?: string;
  onAction?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Toast(props: ToastProps): JSX.Element;

/** Fixed corner stack that holds Toasts. */
export interface ToastViewportProps {
  /** Corner: "top-start" | "top-center" | "top-end" | "bottom-start" | "bottom-center" | "bottom-end". */
  placement?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function ToastViewport(props: ToastViewportProps): JSX.Element;
```

### Tooltip  
<sub>`components/feedback/Tooltip.jsx`</sub>

```ts
import * as React from "react";

/**
 * Small hover/focus label on a single child. Black bubble, sharp, flat.
 */
export interface TooltipProps {
  /** The text shown in the bubble. */
  label: React.ReactNode;
  /** RTL-aware placement. start/end follow the inline axis. */
  placement?: "top" | "bottom" | "start" | "end";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Tooltip(props: TooltipProps): JSX.Element;
```

---

## surfaces

### Card  
<sub>`components/surfaces/Card.jsx`</sub>

```ts
import * as React from "react";

/**
 * Neutral content container — dark raised surface, hairline border, sharp, flat.
 * For media tiles use ShowcaseTile; for pricing use PlanCard.
 */
export interface CardProps {
  /** Serif title in the header (or pass a custom `header`). */
  title?: string;
  subtitle?: string;
  /** Custom header node (overrides title/subtitle). */
  header?: React.ReactNode;
  /** Footer node; children align to the inline-end. */
  footer?: React.ReactNode;
  /** Lift the border on hover (use when the whole card is a link). */
  interactive?: boolean;
  /** Inner padding in px. Default 20. */
  padding?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
```

### Drawer  
<sub>`components/surfaces/Drawer.jsx`</sub>

```ts
import * as React from "react";

/**
 * Edge sheet that slides in over a dim black backdrop. Generic content panel;
 * for the primary slide-out navigation use SideDrawer.
 */
export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  /** RTL-aware edge: start | end (inline axis) | bottom. Default "end". */
  side?: "start" | "end" | "bottom";
  title?: string;
  footer?: React.ReactNode;
  /** Width (side panels) or height (bottom) in px. Default 380. */
  size?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Drawer(props: DrawerProps): JSX.Element;
```

### Modal  
<sub>`components/surfaces/Modal.jsx`</sub>

```ts
import * as React from "react";

/**
 * Centered blocking dialog over a dim black backdrop. Sharp, flat. Esc / backdrop
 * click close. Render conditionally with `open`.
 */
export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  /** Serif headline in the header. */
  title?: string;
  /** Footer actions (align to the inline-end). */
  footer?: React.ReactNode;
  /** Max width in px. Default 520. */
  width?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Modal(props: ModalProps): JSX.Element;
```

---

## media

### CarouselDots  
<sub>`components/media/CarouselDots.jsx`</sub>

```ts
import * as React from "react";

export interface CarouselDotsProps {
  /** Number of slides. */
  count: number;
  /** Active slide index. */
  active?: number;
  onSelect?: (index: number) => void;
  style?: React.CSSProperties;
}

/** Dot position indicators for the hero / movie carousel (active dot elongates). */
export function CarouselDots(props: CarouselDotsProps): JSX.Element;
```

### HeroBanner  
<sub>`components/media/HeroBanner.jsx`</sub>

```ts
import * as React from "react";

/**
 * Large editorial promo banner with a Playfair headline and primary CTA.
 */
export interface HeroBannerProps {
  image?: string;
  /** Bright-blue kicker above the headline. */
  kicker?: string;
  /** Playfair headline. */
  title: React.ReactNode;
  /** Primary CTA label (uppercased). Omit for no button. */
  ctaLabel?: string;
  /** Append a trailing chevron to the CTA (mirrors the Link `arrow` affordance). */
  ctaArrow?: boolean;
  onCta?: () => void;
  height?: number;
  style?: React.CSSProperties;
}

export function HeroBanner(props: HeroBannerProps): JSX.Element;
```

### ShowcaseTile  
<sub>`components/media/ShowcaseTile.jsx`</sub>

```ts
import * as React from "react";

/** Font role for a tile's title or kicker. */
export type TileFontRole = "display" | "sans" | "tile";

/**
 * Signature bento media cell — full-bleed image, bottom scrim, kicker + title.
 *
 * Title font is PROMINENCE-DRIVEN by default: a large featured / hero tile gets
 * the Playfair display face; an ordinary gallery tile gets Montserrat. Noto Serif
 * ("tile") is opt-in. Override per tile with `titleFont` / `kickerFont` (font role)
 * or `titleStyle` / `kickerStyle` (arbitrary style).
 */
export interface ShowcaseTileProps {
  /** Full-bleed background image URL. */
  image?: string;
  /** Bright-blue action kicker (WATCH / LISTEN / DESTINATION …). */
  kicker?: string;
  /** Tile title. */
  title: React.ReactNode;
  /**
   * Title font role override. Omitted → chosen by prominence: large/hero tile →
   * "display" (Playfair); otherwise → "sans" (Montserrat).
   *  "display" — Playfair Display 600
   *  "sans"    — Montserrat 600
   *  "tile"    — Noto Serif Display 600 (opt-in)
   */
  titleFont?: TileFontRole;
  /** Kicker font role override. Defaults to Montserrat (the kicker's own face). */
  kickerFont?: TileFontRole;
  /** Arbitrary style overrides for the title element. */
  titleStyle?: React.CSSProperties;
  /** Arbitrary style overrides for the kicker element. */
  kickerStyle?: React.CSSProperties;
  /** @deprecated Use `titleFont`. Alias for the title font role. */
  font?: TileFontRole;
  /** @deprecated Use `titleFont`. true = Noto Serif ("tile"); false = Montserrat ("sans"). */
  serif?: boolean;
  /** Title font-size in px. Drives the prominence default (≥30 → display). */
  titleSize?: number;
  /** Tile height in px. Also drives the prominence default (≥300 → display). */
  height?: number;
  align?: "left" | "center";
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function ShowcaseTile(props: ShowcaseTileProps): JSX.Element;
```

---

## layout

### BentoGrid  
<sub>`components/layout/BentoGrid.jsx`</sub>

```ts
import * as React from "react";

/** One tier's layout: rows of space-separated area names + optional track sizing. */
export interface BentoTier {
  /** Rows of the grid, each a string of area names, e.g. "hero hero promoA". */
  areas: string[];
  /** grid-template-columns, e.g. "2fr 1fr 1fr". */
  columns?: string;
  /** grid-template-rows (optional). */
  rows?: string;
}

/**
 * Asymmetric layout via CSS named grid-template-areas — mobile-first. Name regions once
 * (keys of `items`), then re-place them per tier at the 561 / 1101px breakpoints.
 */
export interface BentoGridProps {
  /** Map of area name → node. Each is placed into its matching grid area. */
  items: Record<string, React.ReactNode>;
  /** Base / phone tier (single-column stack is typical). */
  phone?: BentoTier;
  /** Tablet tier (≥ 561px). */
  tablet?: BentoTier;
  /** Desktop tier (≥ 1101px) — the asymmetric composition. */
  desktop?: BentoTier;
  /** Gap in px. Default 16. */
  gap?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function BentoGrid(props: BentoGridProps): JSX.Element;
```

### TileGrid  
<sub>`components/layout/TileGrid.jsx`</sub>

```ts
import * as React from "react";

/**
 * The system's single responsive grid, authored mobile-first: phone is the base
 * stack; tablet/desktop add columns upward at the documented 561 / 1101px breakpoints.
 */
export interface TileGridProps {
  /** Columns on desktop (≥ 1101px). Default 4. */
  columns?: number;
  /** Columns on tablet (561–1100px). Defaults to min(columns, 2). */
  tablet?: number;
  /** Columns on phone (≤ 560px). Default 1. */
  phone?: number;
  /** Gap in px. Default 16. */
  gap?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function TileGrid(props: TileGridProps): JSX.Element;
```

---

## data

### DataGrid  
<sub>`components/data/DataGrid.jsx`</sub>

```ts
import * as React from "react";

export interface DataGridColumn {
  key: string;
  header: React.ReactNode;
  align?: "start" | "center" | "end";
  width?: number | string;
  /** Disable sorting for this column. */
  sortable?: boolean;
  /** Value used for sorting (defaults to row[key]). */
  sortValue?: (row: any) => string | number;
  /** Custom cell renderer. */
  render?: (row: any) => React.ReactNode;
}

/**
 * Interactive table — click-to-sort heads, optional row selection, sticky head.
 * Same flat sharp treatment as Table; one accent for sort / selection.
 */
export interface DataGridProps {
  columns?: DataGridColumn[];
  rows?: any[];
  /** Field used as the row id (default "id"). */
  rowKey?: string;
  /** Show a leading selection checkbox column. */
  selectable?: boolean;
  /** Controlled selected ids (Set or array). */
  selected?: Set<string> | string[];
  onSelectedChange?: (next: Set<string>) => void;
  style?: React.CSSProperties;
}

export function DataGrid(props: DataGridProps): JSX.Element;
```

### DetailItem  
<sub>`components/data/DetailItem.jsx`</sub>

```ts
import * as React from "react";

/**
 * Quiet label-over-value spec pair (no icon, no border) for secondary fact rows.
 * Group in a TileGrid.
 */
export interface DetailItemProps {
  /** Uppercase label. */
  label: React.ReactNode;
  /** Value text. */
  value: React.ReactNode;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
}

export function DetailItem(props: DetailItemProps): JSX.Element;
```

### MetricTile  
<sub>`components/data/MetricTile.jsx`</sub>

```ts
import * as React from "react";
import { IconName } from "../core/Icon";

/**
 * A single stat tile — line icon, uppercase label, large value. Hairline border,
 * transparent fill, sharp by default (rounds via --radius-card). Group in a TileGrid.
 */
export interface MetricTileProps {
  /** Icon name (from the Icon set) or a custom node. */
  icon?: IconName | React.ReactNode;
  /** Uppercase label, e.g. "Altitude". */
  label: React.ReactNode;
  /** Large primary value, e.g. "37,000 ft". */
  value: React.ReactNode;
  /** Optional small sub-line under the value. */
  sub?: React.ReactNode;
  /** Icon color. Default bright-blue. */
  iconColor?: string;
  style?: React.CSSProperties;
}

export function MetricTile(props: MetricTileProps): JSX.Element;
```

### Table  
<sub>`components/data/Table.jsx`</sub>

```ts
import * as React from "react";

export interface TableColumn {
  key: string;
  header: React.ReactNode;
  /** Cell alignment — use "end" for numbers (right-aligned, tabular). */
  align?: "start" | "center" | "end";
  width?: number | string;
  /** Custom cell renderer (row) => node. */
  render?: (row: any) => React.ReactNode;
}

/**
 * Semantic data table — uppercase heads, hairline dividers, flat. For sorting /
 * selection / large sets use DataGrid.
 */
export interface TableProps {
  columns?: TableColumn[];
  rows?: any[];
  /** Field used as the React key per row. */
  rowKey?: string;
  getCellValue?: (row: any, col: TableColumn) => React.ReactNode;
  style?: React.CSSProperties;
}

export function Table(props: TableProps): JSX.Element;
```

---

## domain

### FlightProgress  
<sub>`components/domain/FlightProgress.jsx`</sub>

```ts
import * as React from "react";

/**
 * Hero route card for a Flight page — origin/destination codes, status, progress
 * line with plane, elapsed/remaining. (The drawer's compact strip is FlightTracker.)
 */
export interface FlightProgressProps {
  origin?: string;
  originCity?: string;
  destination?: string;
  destinationCity?: string;
  /** Status kicker, e.g. "En Route", "Boarding", "Landed". */
  status?: string;
  /** 0–1 progress of the flight. */
  progress?: number;
  /** Left footer label. */
  elapsed?: string;
  /** Right footer label. */
  remaining?: string;
  /** Fill with surface-2 instead of a transparent hairline panel. */
  filled?: boolean;
  style?: React.CSSProperties;
}

export function FlightProgress(props: FlightProgressProps): JSX.Element;
```

### FlightTracker  
<sub>`components/domain/FlightTracker.jsx`</sub>

```ts
import * as React from "react";

export interface FlightTrackerProps {
  /** Origin airport code. */
  origin?: string;
  /** Destination airport code. */
  destination?: string;
  /** Remaining/elapsed label, e.g. "3h 28m". */
  duration?: string;
  /** 0–1 progress of the flight. */
  progress?: number;
  style?: React.CSSProperties;
}

/** Origin → plane → destination progress strip for the side drawer header. */
export function FlightTracker(props: FlightTrackerProps): JSX.Element;
```

### NewsItem  
<sub>`components/domain/NewsItem.jsx`</sub>

```ts
import * as React from "react";

export interface NewsItemProps {
  image?: string;
  headline: React.ReactNode;
  /** Relative time, e.g. "an hour ago". */
  timestamp?: string;
  /** Lead story = large stacked layout with a Playfair headline. */
  lead?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/** A news headline row (or lead story) — thumbnail, headline, relative timestamp. */
export function NewsItem(props: NewsItemProps): JSX.Element;
```

### PlanCard  
<sub>`components/domain/PlanCard.jsx`</sub>

```ts
import * as React from "react";

/**
 * Wi-Fi pricing plan card; recommended variant gets a highlight-blue top bar and filled CTA.
 */
export interface PlanCardProps {
  /** Plan name, e.g. "High-Speed Streaming". */
  name: string;
  /** Price, e.g. "$6". */
  price: string;
  /** Feature lines (rendered with blue check-circle bullets). */
  features?: string[];
  /** Emphasize as recommended: solid blue top bar, star, badge, filled CTA. */
  recommended?: boolean;
  /** Caption above the CTA on the recommended card. */
  badge?: string;
  ctaLabel?: string;
  onSelect?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function PlanCard(props: PlanCardProps): JSX.Element;
```

### WeatherGlyph  
<sub>`components/domain/WeatherGlyph.jsx`</sub>

```ts
import * as React from "react";
import type { IconName } from "../core/Icon";

/** AccuWeather code → metadata entry. */
export interface WeatherCodeEntry {
  label: string;
  day?: boolean;
  night?: boolean | number;
  both?: boolean;
  fb: IconName;
}

/** The full AccuWeather condition catalog, keyed by numeric code. */
export declare const WEATHER_CODES: Record<number, WeatherCodeEntry>;

/** Resolve a code to its night equivalent (or itself when there is no separate one). */
export declare function nightCode(code: number): number;

export interface WeatherGlyphProps {
  /** AccuWeather icon code, e.g. 1 (Sunny), 3 (Partly Sunny), 12 (Showers), 33 (Clear). */
  code?: number;
  /** Swap a day `code` for its nocturnal variant. */
  night?: boolean;
  /** Folder holding the colored SVGs. Default "assets/icons/weather". */
  base?: string;
  /** File extension. Default "svg". */
  ext?: string;
  /** Explicit image src; overrides `code`/`base` resolution. */
  src?: string;
  /** Line-icon fallback name; defaults to the catalog entry's `fb`. */
  fb?: IconName;
  size?: number;
  /** Fallback line-icon color. */
  color?: string;
  alt?: string;
  style?: React.CSSProperties;
}

/** AccuWeather condition icon (colored SVG) with a line-icon fallback. */
export function WeatherGlyph(props: WeatherGlyphProps): JSX.Element;
```

### WeatherTile  
<sub>`components/domain/WeatherTile.jsx`</sub>

```ts
import * as React from "react";
import type { IconName } from "../core/Icon";

export interface WeatherTileProps {
  date?: string;
  city?: string;
  /** AccuWeather icon code (1=Sunny, 3=Partly Sunny, 33=Clear…). */
  code?: number;
  /** Render the nocturnal variant of `code`. */
  night?: boolean;
  /** Folder holding the colored SVGs. Default "assets/icons/weather". */
  base?: string;
  /** Line-icon fallback name (sun / cloud / cloud-sun / cloud-rain). */
  fb?: IconName;
  /** Explicit image src; overrides `code`/`base`. */
  iconSrc?: string;
  /** Temperature value, e.g. "79.5°". */
  temp?: string;
  /** Unit letter, "F" or "C". */
  unit?: string;
  condition?: string;
  linkLabel?: string;
  onLink?: () => void;
  style?: React.CSSProperties;
}

/** Pure-black weather dashboard module: date, city, icon, temperature, forecast link. */
export function WeatherTile(props: WeatherTileProps): JSX.Element;
```

---

## navigation

### Accordion  
<sub>`components/navigation/Accordion.jsx`</sub>

```ts
import * as React from "react";

export interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
}

/**
 * Stacked expandable sections separated by hairlines, with a rotating chevron.
 */
export interface AccordionProps {
  items?: AccordionItem[];
  /** Allow several panels open at once. Default false (single). */
  multiple?: boolean;
  /** Indices open on mount. */
  defaultOpen?: number[];
  style?: React.CSSProperties;
}

export function Accordion(props: AccordionProps): JSX.Element;
```

### Breadcrumbs  
<sub>`components/navigation/Breadcrumbs.jsx`</sub>

```ts
import * as React from "react";

export interface Crumb {
  label: React.ReactNode;
  /** Omit on the current (last) page. */
  href?: string;
}

/**
 * Hierarchical trail — muted links, chevron separators (mirror under RTL),
 * plain current page.
 */
export interface BreadcrumbsProps {
  items?: Crumb[];
  style?: React.CSSProperties;
}

export function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
```

### FilterPanel  
<sub>`components/navigation/FilterPanel.jsx`</sub>

```ts
import * as React from "react";

/**
 * Container for a set of filter groups. Header with title + "Clear all"; holds
 * FilterSections. Use inline in a sidebar or inside a Drawer on phone.
 */
export interface FilterPanelProps {
  title?: string;
  /** Count of applied filters, shown beside the title. */
  activeCount?: number;
  /** Renders the "Clear all" link when provided. */
  onClear?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function FilterPanel(props: FilterPanelProps): JSX.Element;

/** One labelled group within a FilterPanel (hairline rule + uppercase label). */
export interface FilterSectionProps {
  label?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function FilterSection(props: FilterSectionProps): JSX.Element;
```

### NavBar  
<sub>`components/navigation/NavBar.jsx`</sub>

```ts
import * as React from "react";

/**
 * Sticky top bar: hamburger + home (+ optional logo), centered title, search / Wi-Fi / profile icons.
 */
export interface NavBarProps {
  /** Centered view title (e.g. "Showcase", "Movies"). */
  title?: React.ReactNode;
  /** Logo image URL shown beside the hamburger. */
  logo?: string;
  onMenu?: () => void;
  /** Click handler for the standard Home button (shown to the right of the hamburger). */
  onHome?: () => void;
  /** Wi-Fi glyph active (bright-blue) when connected. */
  wifiActive?: boolean;
  onSearch?: () => void;
  onProfile?: () => void;
  style?: React.CSSProperties;
}

export function NavBar(props: NavBarProps): JSX.Element;
```

### NavigationMenu  
<sub>`components/navigation/NavigationMenu.jsx`</sub>

```ts
import * as React from "react";

export interface NavMenuItem {
  label: React.ReactNode;
  /** Selection key (defaults to label). */
  value?: string;
  /** Leading line-icon name. */
  icon?: string;
  /** Trailing count / badge. */
  badge?: React.ReactNode;
}
export interface NavMenuGroup {
  label?: string;
  items: NavMenuItem[];
}

/**
 * Data-driven vertical destination list, optionally grouped into sections.
 * Active item is bright-blue with an inline-start rule. Built to grow.
 */
export interface NavigationMenuProps {
  /** Flat NavMenuItem[] or grouped NavMenuGroup[]. */
  items?: NavMenuItem[] | NavMenuGroup[];
  value?: string;
  onSelect?: (value: string, item: NavMenuItem) => void;
  style?: React.CSSProperties;
}

export function NavigationMenu(props: NavigationMenuProps): JSX.Element;
```

### Pagination  
<sub>`components/navigation/Pagination.jsx`</sub>

```ts
import * as React from "react";

/**
 * Page selector — sharp square cells, highlight-blue current page, mirroring
 * prev/next chevrons. Long ranges collapse with ellipses.
 */
export interface PaginationProps {
  /** Current 1-based page. */
  page?: number;
  /** Total page count. */
  total?: number;
  onChange?: (page: number) => void;
  style?: React.CSSProperties;
}

export function Pagination(props: PaginationProps): JSX.Element;
```

### SideDrawer  
<sub>`components/navigation/SideDrawer.jsx`</sub>

```ts
import * as React from "react";
import type { FlightTrackerProps } from "../domain/FlightTracker";

export interface DrawerItem {
  key: string;
  label: string;
}

/**
 * Full-height black slide-out menu: flight tracker + large Montserrat nav items.
 */
export interface SideDrawerProps {
  open?: boolean;
  /** Nav items — strings or { key, label }. */
  items?: (string | DrawerItem)[];
  /** Active item key. */
  active?: string;
  /** Flight tracker props rendered at the top; omit to hide. */
  flight?: FlightTrackerProps;
  onSelect?: (key: string) => void;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export function SideDrawer(props: SideDrawerProps): JSX.Element;
```

### Tabs  
<sub>`components/navigation/Tabs.jsx`</sub>

```ts
import * as React from "react";

/**
 * Horizontal view switcher. Active tab is bright-blue with a highlight-blue
 * underline. Data-driven; scrolls when it overflows.
 */
export interface TabsProps {
  /** string[] or {value,label}[]. */
  tabs?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export function Tabs(props: TabsProps): JSX.Element;
```
