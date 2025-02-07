import { useState } from "react";
import { actionButton } from "./AppStyles";

function NewItemAdder({ addNewItem }) {
  const [newItemName, setNewItemName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newItemName = e.target[0].value.trim();
    const success = addNewItem(newItemName);
    if (success) {
      setNewItemName("");
    }
  };
  return (
    <div className="w-full flex justify-center">
      <form onSubmit={onSubmit} className="flex flex-grow space-x-2 mb-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
          className="flex-grow border border-slate-400 rounded p-1"
        />
        <button type="submit" className={`${actionButton} px-3`}>
          Add Item
        </button>
      </form>
    </div>
  );
}

export default NewItemAdder;
