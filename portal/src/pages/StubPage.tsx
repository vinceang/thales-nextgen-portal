import { EmptyState } from "../design-system/components";
import s from "./StubPage.module.css";

/** Placeholder for routes not yet built this session. */
export default function StubPage({ title, note }: { title: string; note: string }) {
  return (
    <div className={s.wrap}>
      <EmptyState
        icon="inbox"
        title={title}
        message={`${note}. This view is stubbed — coming in a later session.`}
      />
    </div>
  );
}
