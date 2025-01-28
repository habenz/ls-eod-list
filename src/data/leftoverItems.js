import leftoverItems from "./leftoverItems.json";

const items = [];
leftoverItems.forEach((item) => {
  if (!item.types) {
    items.push({
      name: item.name,
      shortName: item.short_name,
      category: item.category || item.name,
      count: 0,
    });
    return;
  }
  item.types.forEach((itemType) => {
    const name = `${itemType.name} ${item.name}`;
    const shortName = `${itemType.short_name} ${item.short_name}`;
    items.push({
      name: name.trim(),
      shortName: shortName.trim(),
      category: item.category || item.name,
      count: 0,
    });
  });
});

export default items;
