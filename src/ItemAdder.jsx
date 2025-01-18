import { useState } from "react";

function ItemAdder({ name }) {
  const [count, setCount] = useState(0);

  const updateCount = (amt) => {
    if (count + amt < 0) {
      return;
    }
    setCount((currCount) => currCount + amt);
  };

  const buttonStyles = "text-xl font-bold border rounded p-1 px-3";

  return (
    <div className="my-1">
      <div className="flex justify-between mx-3">
        <div className="text-lg">{name[0].toUpperCase() + name.slice(1)}</div>
        <div className="flex items-center justify-evenly max-w-52">
          <button onClick={() => updateCount(-1)} className={buttonStyles}>
            {/* Hilariously this is an en dash (–) maybe use an icon */}–
          </button>
          <div className="px-2">{count}</div>
          <button onClick={() => updateCount(1)} className={buttonStyles}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemAdder;
