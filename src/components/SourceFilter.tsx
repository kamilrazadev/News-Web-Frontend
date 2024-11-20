import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

interface SourceFilterProps {
  source: string;
  onSourceChange: (source: string) => void;
}

const SourceFilter: React.FC<SourceFilterProps> = ({
  source,
  onSourceChange,
}) => {
  const sources = ["News API", "New York Times", "The Guardians"]; // Define sources array

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg border border-gray-300 text-gray-700 text-nowrap">
        {source}
        <ChevronDown className="mt-1 ms-1 w-5" />
      </Menu.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="relative z-10"
      >
        <Menu.Items className="absolute -left-10 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2">
            {sources.map((label) => (
              <Menu.Item key={label}>
                {({ active }) => (
                  <button
                    onClick={() => onSourceChange(label)}
                    className={`${
                      active ? "bg-gray-50" : ""
                    } hover:bg-blue-600 hover:text-white flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-900`}
                  >
                    {label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SourceFilter;
