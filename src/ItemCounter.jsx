import { useState, useRef } from "react";
import { capitalizeFirst } from "./utils";

function ItemCounter({ item, bgColor, setItemCount }) {
  const prev = useRef(item.count);
  const [textEditing, setEditing] = useState(false);

  const updateCount = (amt) => {
    if (item.count + amt < 0) {
      return;
    }
    prev.current = item.count + amt;
    setItemCount(item.count + amt);
  };
  const increment = () => updateCount(1);
  const decrement = () => updateCount(-1);

  const handleChange = (e) => {
    const value = e.target.value;
    const valueAsNum = parseInt(value);
    setItemCount(value);
    // lock it in if it's a valid value
    if (Number.isInteger(valueAsNum) && valueAsNum >= 0) {
      prev.current = valueAsNum;
    }
  };

  const stopEditing = () => {
    if (item.count !== prev.current) {
      // revert to most recent valid count
      setItemCount(prev.current);
    }
    setEditing(false);
  };

  const displayName = capitalizeFirst(item.name);

  const buttonStyles =
    "text-lg font-bold border rounded p-1 px-3 bg-white bg-opacity-70";
  return (
    <div className="my-0.5 p-1 rounded" style={{ backgroundColor: bgColor }}>
      <div className="flex justify-between items-center">
        <div>{displayName}</div>
        <div className="flex items-center justify-evenly max-w-52">
          <button onClick={decrement} className={buttonStyles}>
            {/* Hilariously this is an en dash (–) maybe use an icon */}–
          </button>
          <div className="px-2">
            {textEditing ? (
              <input
                type="number"
                value={item.count === 0 ? "" : item.count}
                className="w-12 text-center"
                autoFocus
                onBlur={stopEditing}
                onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                onChange={handleChange}
              />
            ) : (
              <div
                className="w-12 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => setEditing(true)}
              >
                {item.count}
              </div>
            )}
          </div>
          <button onClick={increment} className={buttonStyles}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCounter;
