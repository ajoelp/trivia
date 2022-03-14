import { Fragment, ReactNode, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { classNames } from "../services/utils";

type LinkProps = JSX.IntrinsicElements["a"];

type BaseOption = { label: string };
type ButtonOption = { type: "button"; onClick: () => any };
type LinkOption = { type: "link"; href: LinkProps["href"]; target?: LinkProps["target"] };

export type DropdownOption = BaseOption & (ButtonOption | LinkOption);

interface DropdownProps {
  children: ReactNode;
  options: DropdownOption[];
}

export default function Dropdown({ children, options }: DropdownProps) {
  const buttonClasses = (active: boolean) =>
    classNames(active && "bg-gray-700", "block px-4 py-2 text-sm w-full text-left text-white");

  const menuOptions = useMemo(() => {
    return options.map((option, index) => {
      if (option.type === "button") {
        return (
          <Menu.Item key={index}>
            {({ active }) => (
              <button onClick={option.onClick} className={buttonClasses(active)}>
                {option.label}
              </button>
            )}
          </Menu.Item>
        );
      }
      if (option.type === "link") {
        return (
          <Menu.Item key={index}>
            {({ active }) => (
              <a href={option.href} target={option.target} className={buttonClasses(active)}>
                {option.label}
              </a>
            )}
          </Menu.Item>
        );
      }
      return <div key={index} />;
    });
  }, [options]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center items-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {children}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute border border-gray-600 right-0 mt-2 w-56 rounded-md bg-gray-800 shadow-xl ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{menuOptions}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
