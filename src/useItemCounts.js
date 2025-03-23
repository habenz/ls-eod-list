import useLocalStorage from "./useLocalStorage";

// Development helper to manually test reset functionality
export function debugForceReset() {
  localStorage.setItem(
    "last-reset-date",
    JSON.stringify(new Date().getDate() - 1)
  );
}

function useItemCounts(initialItems) {
  const [itemCounts, setItemCounts] = useLocalStorage(
    "default-items",
    initialItems
  );
  const [userAddedItems, setUserAddedItems] = useLocalStorage(
    "user-added-items",
    []
  );
  const [lastResetDate, setLastResetDate] = useLocalStorage(
    "last-reset-date",
    ""
  );

  // Check if we need to reset (different day)
  const today = new Date().getDate();
  if (lastResetDate !== today) {
    setItemCounts(initialItems);
    setUserAddedItems([]);
    setLastResetDate(today);
  }

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
