import ItemAdder from "./ItemAdder";

function App({ items }) {
  return (
    <>
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
    </>
  );
}

export default App;
