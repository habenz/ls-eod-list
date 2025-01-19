import { useState } from "react";
import ItemAdder from "./ItemAdder";

function App({ items }) {
  const [userAddedItems, setUserAddedItems] = useState([]);
  return (
    <div className="flex justify-center w-full">
      <div className="w-5/6 max-w-lg">
        <h1 className="text-xl flex justify-center mb-2 pb-2 font-semibold border-b">
          Leftover Inventory Counter
        </h1>
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
        <button className="w-full py-2 bg-black rounded text-slate-100">
          Send Screenshot
        </button>
      </div>
    </div>
  );
}

export default App;
