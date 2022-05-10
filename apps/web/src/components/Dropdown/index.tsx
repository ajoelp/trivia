import { ReactNode, useMemo } from "react";
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
  const menuOptions = useMemo(() => {
    return options.map((option, index) => {
      if (option.type === "button") {
        return (
          <MenuItem key={index} onClick={option.onClick}>
            {option.label}
          </MenuItem>
        );
      }
      if (option.type === "link") {
        return (
          <MenuItem key={index} as="a" href={option.href} target={option.target}>
            {option.label}
          </MenuItem>
        );
      }
      return <MenuDivider key={index} />;
    });
  }, [options]);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
        {children}
      </MenuButton>

      <MenuList color="black">{menuOptions}</MenuList>
    </Menu>
  );
}
