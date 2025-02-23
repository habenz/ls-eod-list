import { Fragment } from "react";
import ItemCounter from "./ItemCounter";
import CondensedItem from "./CondensedItem";

function ItemCounters({
  userAddedItems,
  items,
  condensed,
  itemUpdaterFactory,
}) {
  const baseHue = 250; // Starting point (e.g., blue)
  const hueStep = 25; // Step between hues
  const shouldShowItem = (item) => !condensed || item.count > 0;
  let shownItems = [...userAddedItems, ...items].filter(shouldShowItem);
  console.log(shownItems);
  let seenCategories = new Set();
  return (
    <>
      {shownItems.map((item, i) => {
        let isCategoryLeader =
          !seenCategories.has(item.category) &&
          i !== shownItems.length - 1 &&
          shownItems[i + 1].category === item.category;

        if (!seenCategories.has(item.category)) {
          seenCategories.add(item.category);
        }

        const hue = baseHue + ((seenCategories.size * hueStep) % 360);
        const bgColor = `hsl(${hue}, 60%, 90%)`;
        return condensed ? (
          <CondensedItem
            item={item}
            bgColor={bgColor}
            key={item.name}
            isCategoryLeader={isCategoryLeader}
          />
        ) : (
          <Fragment key={item.name}>
            {isCategoryLeader && <CategoryBorder name={item.category} />}
            <ItemCounter
              item={item}
              bgColor={bgColor}
              setItemCount={itemUpdaterFactory(item.name)}
            />
          </Fragment>
        );
      })}
    </>
  );
}

function CategoryBorder({ name }) {
  return (
    <div className="flex items-center">
      <div className="border-b flex-1"></div>
      <span className="text-xs text-center leading-[0.1] text-slate-500">
        {name}
      </span>
      <div className="border-b flex-1"></div>
    </div>
  );
}

export default ItemCounters;
