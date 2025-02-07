import React, { useState } from "react";
import ItemCounters from "./ItemCounters";
import NewItemAdder from "./NewItemAdder";
import useItemCounts from "./useItemCounts";
import DateAndLocation from "./DateAndLocation";
import { actionButton, contentWidth } from "./AppStyles";

function App({ items }) {
  const [showCondensed, setShowCondensed] = useState(false);
  const { itemCounts, userAddedItems, itemUpdaterByName, addNewItem } =
    useItemCounts(items);

  const condensedStyles = showCondensed
    ? "grid grid-cols-2 p-3 m-2 border rounded"
    : "";

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {showCondensed && <DateAndLocation />}
      <div className={`${contentWidth} ${condensedStyles}`}>
        {!showCondensed && (
          <>
            <Title />
            <NewItemAdder addNewItem={addNewItem} />
          </>
        )}
        <ItemCounters
          userAddedItems={userAddedItems}
          items={itemCounts}
          condensed={showCondensed}
          itemUpdaterFactory={itemUpdaterByName}
        />
        {showCondensed ? (
          <ChangeCountsButton onClick={() => setShowCondensed(false)} />
        ) : (
          <SendScreenshotButton onClick={() => setShowCondensed(true)} />
        )}
      </div>
    </div>
  );
}

function Title() {
  return (
    <h1 className="text-xl flex justify-center mb-2 pb-2 font-semibold border-b">
      Leftover Inventory
    </h1>
  );
}

function SendScreenshotButton({ onClick }) {
  return (
    <button onClick={onClick} className={`w-full py-2 ${actionButton}`}>
      Send Screenshot
    </button>
  );
}

function ChangeCountsButton({ onClick }) {
  return (
    <div className="col-start-1 col-span-2 justify-center mt-4 flex">
      <button onClick={onClick} className={`${actionButton} w-max p-1`}>
        Change Counts
      </button>
    </div>
  );
}

export default App;
