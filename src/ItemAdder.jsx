import { useState, useRef } from "react";

function ItemAdder({ name }) {
  console.log(name);
  const [count, setCount] = useState(0);
  const prev = useRef(count);
  const [textEditing, setEditing] = useState(false);

  const updateCount = (amt) => {
    if (count + amt < 0) {
      return;
    }
    setCount((currCount) => currCount + amt);
    prev.current = count + amt;
  };
  const increment = () => updateCount(1);
  const decrement = () => updateCount(-1);

  const handleChange = (e) => {
    const value = e.target.value;
    const valueAsNum = parseInt(value);
    setCount(value);
    // lock it in if it's a valid value
    if (Number.isInteger(valueAsNum) && valueAsNum >= 0) {
      prev.current = valueAsNum;
    }
  };

  const stopEditing = () => {
    if (count !== prev.current) {
      // revert to most recent valid count
      setCount(prev.current);
    }
    setEditing(false);
  };

  const buttonStyles = "text-xl font-bold border rounded p-1 px-3";

  return (
    <div className="my-1">
      <div className="flex justify-between mx-3">
        <div className="text-lg">{name[0].toUpperCase() + name.slice(1)}</div>
        <div className="flex items-center justify-evenly max-w-52">
          <button onClick={decrement} className={buttonStyles}>
            {/* Hilariously this is an en dash (–) maybe use an icon */}–
          </button>
          <div className="px-2">
            {textEditing ? (
              <input
                type="number"
                value={count}
                className="w-12 text-center"
                autoFocus
                onBlur={stopEditing}
                onChange={handleChange}
              />
            ) : (
              <div
                className="w-12 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => setEditing(true)}
              >
                {count}
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

export default ItemAdder;
