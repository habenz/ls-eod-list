import { useState } from "react";
import ItemAdder from "./ItemAdder";
import NewItemAdder from "./NewItemAdder";

function App({ items }) {
  const [userAddedItems, setUserAddedItems] = useState([]);
  const [showCondensed, setShowCondensed] = useState(false);

  const addNewItem = (e) => {
    e.preventDefault();
    const newItemName = e.target[0].value.trim();
    if (newItemName && !userAddedItems.includes(newItemName)) {
      setUserAddedItems((items) => [newItemName, ...items]);
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
            <h1 className="text-xl flex justify-center mb-2 pb-2 font-semibold border-b">
              Leftover Inventory
            </h1>
            <NewItemAdder addNewItem={addNewItem} />
          </>
        )}

        <ItemCounters
          userAddedItems={userAddedItems}
          items={items}
          condensed={showCondensed}
        />
        {!showCondensed && (
          <button
            onClick={() => setShowCondensed(true)}
            className="w-full py-2 bg-black rounded text-slate-200"
          >
            Send Screenshot
          </button>
        )}
        {showCondensed && (
          <div className="col-start-1 col-span-2 justify-center mt-4 flex">
            <button
              onClick={() => setShowCondensed(false)}
              className="bg-black rounded text-slate-200 w-max p-1"
            >
              Change Counts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ItemCounters({ userAddedItems, items, condensed }) {
  const baseHue = 250; // Starting point (e.g., blue)
  const hueStep = 25; // Step between hues

  return (
    <>
      {userAddedItems.map((item) => (
        <ItemAdder
          item={{ name: item, shortName: item }}
          key={item}
          condensed={condensed}
          bgColor={`hsl(${baseHue}, 60%, 90%)`}
        />
      ))}
      {items.map((item, i) => {
        const bgColor = `hsl(${
          baseHue + (((i + 1) * hueStep) % 360)
        }, 60%, 90%)`;
        if (item.types) {
          return (
            <>
              {!condensed && (
                <div className="flex items-center">
                  <div className="border-b flex-1"></div>
                  <span className="text-xs text-center leading-[0.1] text-slate-500">
                    {item.name}
                  </span>
                  <div className="border-b flex-1"></div>
                </div>
              )}
              {item.types.map((itemFlavor) => {
                const name = `${itemFlavor.name} ${item.name}`;
                const shortName = `${itemFlavor.short_name} ${item.short_name}`;
                const itemProp = {
                  name: name.trim(),
                  shortName: shortName.trim(),
                };
                return (
                  <ItemAdder
                    item={itemProp}
                    key={name}
                    condensed={condensed}
                    bgColor={bgColor}
                  />
                );
              })}
            </>
          );
        } else {
          return (
            <ItemAdder
              item={{ name: item.name, shortName: item.short_name }}
              key={item.name}
              condensed={condensed}
              bgColor={bgColor}
            />
          );
        }
      })}
    </>
  );
}

export default App;
