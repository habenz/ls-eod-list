import React, { useState } from "react";
import ItemCounter from "./ItemCounter";
import NewItemAdder from "./NewItemAdder";

function App({ items }) {
  const [itemCounts, setItemCounts] = useState(items);
  const [userAddedItems, setUserAddedItems] = useState([]);
  const [showCondensed, setShowCondensed] = useState(false);

  const setItemCount = (itemName, newCount) => {
    if (itemCounts.some(({ name }) => name === itemName)) {
      setItemCounts((prevCounts) =>
        prevCounts.map((item) =>
          item.name === itemName ? { ...item, count: newCount } : item
        )
      );
    } else if (userAddedItems.some(({ name }) => name === itemName)) {
      setUserAddedItems((prevCounts) =>
        prevCounts.map((item) =>
          item.name === itemName ? { ...item, count: newCount } : item
        )
      );
    } else {
      throw new Error(`Item called ${itemName} does not exist`);
    }
  };

  const addNewItem = (e) => {
    e.preventDefault();
    const newItemName = e.target[0].value.trim();
    if (
      newItemName &&
      !userAddedItems.some(({ name }) => name === newItemName)
    ) {
      setUserAddedItems((items) => [
        { name: newItemName, shortName: newItemName, count: 0 },
        ...items,
      ]);
      console.log(userAddedItems);
      return true;
    }
    return false;
  };

  const condensedStyles = showCondensed
    ? "grid grid-cols-2 p-3 m-2 border rounded"
    : "";

  return (
    <div className="flex justify-center w-full">
      <div className={`w-5/6 max-w-lg ${condensedStyles}`}>
        {!showCondensed && (
          <>
            <Title />
            <NewItemAdder addNewItem={addNewItem} />
          </>
        )}
        <ItemCounters
          userAddedItems={userAddedItems}
          items={itemCounts}
          condensed={showCondensed}
          setItemCount={setItemCount}
        />
        {showCondensed ? (
          <ChangeCountsButton onClick={() => setShowCondensed(false)} />
        ) : (
          <SendScreenshotButton onClick={() => setShowCondensed(true)} />
        )}
      </div>
    </div>
  );
}

function ItemCounters({ userAddedItems, items, condensed, setItemCount }) {
  const baseHue = 250; // Starting point (e.g., blue)
  const hueStep = 25; // Step between hues

  let seenCategories = new Set();
  return (
    <>
      {userAddedItems.map((item) => (
        <ItemCounter
          item={item}
          key={item}
          condensed={condensed}
          bgColor={`hsl(${baseHue}, 60%, 90%)`}
          setItemCount={setItemCount}
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
          <React.Fragment key={item.name}>
            {!condensed && isCategoryLeader && (
              <CategoryBorder name={item.category} />
            )}
            <ItemCounter
              item={item}
              condensed={condensed}
              bgColor={bgColor}
              setItemCount={setItemCount}
            />
          </React.Fragment>
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

function Title() {
  return (
    <h1 className="text-xl flex justify-center mb-2 pb-2 font-semibold border-b">
      Leftover Inventory
    </h1>
  );
}

function SendScreenshotButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 bg-black rounded text-slate-200"
    >
      Send Screenshot
    </button>
  );
}

function ChangeCountsButton({ onClick }) {
  return (
    <div className="col-start-1 col-span-2 justify-center mt-4 flex">
      <button
        onClick={onClick}
        className="bg-black rounded text-slate-200 w-max p-1"
      >
        Change Counts
      </button>
    </div>
  );
}

export default App;
