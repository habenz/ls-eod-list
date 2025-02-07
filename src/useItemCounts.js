import { useState } from "react";

function useItemCounts(initialItems) {
  const [itemCounts, setItemCounts] = useState(initialItems);
  const [userAddedItems, setUserAddedItems] = useState([]);

  const setItemCount = (itemName, newCount) => {
    const updateCounts = (prevCounts) =>
      prevCounts.map((item) =>
        item.name === itemName ? { ...item, count: newCount } : item
      );

    if (itemCounts.some(({ name }) => name === itemName)) {
      setItemCounts(updateCounts);
    } else if (userAddedItems.some(({ name }) => name === itemName)) {
      setUserAddedItems(updateCounts);
    } else {
      throw new Error(`Item called ${itemName} does not exist`);
    }
  };

  const itemUpdaterByName = (itemName) => (newCount) =>
    setItemCount(itemName, newCount);

  const addNewItem = (newItemName) => {
    if (
      newItemName &&
      !userAddedItems.some(({ name }) => name === newItemName)
    ) {
      setUserAddedItems((items) => [
        { name: newItemName, shortName: newItemName, count: 0 },
        ...items,
      ]);
      return true;
    }
    return false;
  };

  return { itemCounts, userAddedItems, itemUpdaterByName, addNewItem };
}

export default useItemCounts;
