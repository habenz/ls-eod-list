import { useState } from "react";
import ItemAdder from "./ItemAdder";
import NewItemAdder from "./NewItemAdder";

function App({ items }) {
  const [userAddedItems, setUserAddedItems] = useState([]);

  const addNewItem = (e) => {
    e.preventDefault();
    const newItemName = e.target[0].value.trim();
    if (newItemName && !userAddedItems.includes(newItemName)) {
      setUserAddedItems((items) => [newItemName, ...items]);
      return true;
    }
    return false;
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-5/6 max-w-lg">
        <h1 className="text-xl flex justify-center mb-2 pb-2 font-semibold border-b">
          Leftover Inventory Counter
        </h1>
        <NewItemAdder addNewItem={addNewItem} />
        {userAddedItems.map((item) => (
          <ItemAdder name={item} key={item} />
        ))}
        {items.map((item) => {
          if (item.types) {
            return (
              <>
                {item.types.map((itemFlavor) => {
                  const name = `${itemFlavor.name} ${item.name}`;
                  return <ItemAdder name={name} key={name} />;
                })}
              </>
            );
          } else {
            return <ItemAdder name={item.name} key={item.name} />;
          }
        })}
        <button className="w-full py-2 bg-black rounded text-slate-200">
          Send Screenshot
        </button>
      </div>
    </div>
  );
}

export default App;
