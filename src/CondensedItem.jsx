import { capitalizeFirst } from "./utils";

function CondensedItem({ item, isCategoryLeader, bgColor }) {
  const displayName = capitalizeFirst(item.shortName);
  return (
    <div
      className={`px-1 ${isCategoryLeader ? "col-start-1" : ""}`}
      style={{ backgroundColor: bgColor }}
    >
      <span>{displayName}</span>:{" "}
      <span className="font-semibold">{item.count}</span>
    </div>
  );
}

export default CondensedItem;
