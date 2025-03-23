import { contentWidth, actionButton } from "./AppStyles";
import { FaExchangeAlt } from "react-icons/fa";
import useLocalStorage from "./useLocalStorage";

function DateAndLocation() {
  const [location, setLocation] = useLocalStorage(
    "location",
    "Charlestown"
  );
  const toggleLocation = () => {
    setLocation(location === "Charlestown" ? "Cambridge" : "Charlestown");
  };

  const date = new Date(Date.now());
  const twoDigitYear = ("" + date.getFullYear()).slice(2);
  const dateString = `${date.getMonth() + 1}/${date.getDate()}/${twoDigitYear}`;
  return (
    <div className={`flex ${contentWidth} mt-2`}>
      <span className="mr-auto ml-1">{dateString}</span>
      <span>{location}</span>
      <button
        className={`mx-3 p-1 px-2 ${actionButton}`}
        onClick={toggleLocation}
      >
        <FaExchangeAlt />
      </button>
    </div>
  );
}

export default DateAndLocation;
