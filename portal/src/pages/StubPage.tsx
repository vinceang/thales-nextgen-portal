import { EmptyState } from "../design-system/components";

/** Placeholder for routes not yet built this session. */
export default function StubPage({ title, note }: { title: string; note: string }) {
  return (
    <div style={{ padding: "var(--space-xl) var(--space-lg)" }}>
      <EmptyState
        icon="inbox"
        title={title}
        message={`${note}. This view is stubbed — coming in a later session.`}
      />
    </div>
  );
}
