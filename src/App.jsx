import { useState } from "react";
import ItemAdder from "./ItemAdder";

function App({ items }) {
  const [userAddedItems, setUserAddedItems] = useState([]);
  return (
    <div className="flex justify-center w-full">
      <div className="w-5/6 max-w-lg">
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
      </div>
    </div>
  );
}

export default App;
