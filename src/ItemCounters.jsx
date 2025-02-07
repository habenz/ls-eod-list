import { Fragment } from "react";
import ItemCounter from "./ItemCounter";

function ItemCounters({
  userAddedItems,
  items,
  condensed,
  itemUpdaterFactory,
}) {
  const baseHue = 250; // Starting point (e.g., blue)
  const hueStep = 25; // Step between hues

  let seenCategories = new Set();
  return (
    <>
      {userAddedItems.map((item) => (
        <ItemCounter
          item={item}
          key={item.name}
          condensed={condensed}
          bgColor={`hsl(${baseHue}, 60%, 90%)`}
          setItemCount={itemUpdaterFactory(item.name)}
        />
      ))}
      {items.map((item, i) => {
        let isCategoryLeader =
          !seenCategories.has(item.category) &&
          i !== items.length - 1 &&
          items[i + 1].category === item.category;

        if (!seenCategories.has(item.category)) {
          seenCategories.add(item.category);
        }

        const hue = baseHue + ((seenCategories.size * hueStep) % 360);
        const bgColor = `hsl(${hue}, 60%, 90%)`;
        return (
          <Fragment key={item.name}>
            {!condensed && isCategoryLeader && (
              <CategoryBorder name={item.category} />
            )}
            <ItemCounter
              item={item}
              condensed={condensed}
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
