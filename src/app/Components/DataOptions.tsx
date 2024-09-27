import { ChangeEvent, FC, useState } from "react";

interface DataOptionsProps {
  onDataChange: (option: string) => void;
}

const DataOptions: FC<DataOptionsProps> = ({ onDataChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>("Test-data-1");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const option = e.target.value;
    setSelectedOption(option);
  };

  const handleGetData = () => {
    onDataChange(selectedOption);
  };

  return (
    <div className="absolute top-[400px] right-10 items-start p-4 border border-blue-500 rounded-md">
      <label className="flex items-center mb-2">
        <input
          type="radio"
          name="dataOption"
          value="Test-data-1"
          checked={selectedOption === "Test-data-1"}
          onChange={handleChange}
          className="form-radio text-blue-600 mr-2"
        />
        Test-data-1
      </label>
      <label className="flex items-center mb-2">
        <input
          type="radio"
          name="dataOption"
          value="Test-data-2"
          checked={selectedOption === "Test-data-2"}
          onChange={handleChange}
          className="form-radio text-blue-600 mr-2"
        />
        Test-data-2
      </label>
      <label className="flex items-center mb-2">
        <input
          type="radio"
          name="dataOption"
          value="Custome-data-1"
          checked={selectedOption === "Custome-data-1"}
          onChange={handleChange}
          className="form-radio text-blue-600 mr-2"
        />
        Custome-data-1
      </label>
      <label className="flex items-center mb-2">
        <input
          type="radio"
          name="dataOption"
          value="Custome-data-2"
          checked={selectedOption === "Custome-data-2"}
          onChange={handleChange}
          className="form-radio text-blue-600 mr-2"
        />
        Custome-data-2
      </label>
      <label className="flex items-center mb-2">
        <input
          type="radio"
          name="dataOption"
          value="Custome-data-3"
          checked={selectedOption === "Custome-data-3"}
          onChange={handleChange}
          className="form-radio text-blue-600 mr-2"
        />
        Custome-data-3
      </label>
      <button
        className="bg-blue-200 text-blue-900 font-semibold py-2 px-4 rounded hover:bg-blue-300"
        onClick={handleGetData}
      >
        Get Data
      </button>
    </div>
  );
};

export default DataOptions;
