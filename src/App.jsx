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

  const condensedStyles = showCondensed ? "grid grid-cols-2" : "";

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
      </div>
    </div>
  );
}

function ItemCounters({ userAddedItems, items, condensed }) {
  return (
    <>
      {userAddedItems.map((item) => (
        <ItemAdder
          item={{ name: item, shortName: item }}
          key={item}
          condensed={condensed}
        />
      ))}
      {items.map((item) => {
        if (item.types) {
          return (
            <>
              {item.types.map((itemFlavor) => {
                const name = `${itemFlavor.name} ${item.name}`;
                const shortName = `${itemFlavor.short_name} ${item.short_name}`;
                const itemProp = {
                  name: name.trim(),
                  shortName: shortName.trim(),
                };
                return (
                  <ItemAdder item={itemProp} key={name} condensed={condensed} />
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
            />
          );
        }
      })}
    </>
  );
}

export default App;
