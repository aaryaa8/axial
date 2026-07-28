import SectionNodeMark, { type MarkVariant } from "./SectionNodeMark";

/** Section label with its node-cluster mark. Used on every page. */
export default function Tag({
  mark,
  dark,
  children,
}: {
  mark: MarkVariant;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={`ab-tag ${dark ? "ab-tag--dark" : ""}`}>
      <SectionNodeMark variant={mark} size={26} dark={dark} />
      {children}
    </span>
  );
}
