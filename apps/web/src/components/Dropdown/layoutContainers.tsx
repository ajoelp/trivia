import styled from "styled-components";
import { Menu } from "@headlessui/react";
import { getSizing } from "../../theme/helpers";

export const DropdownWrapper = styled(Menu)`
  position: relative;
  display: inline-block;
  text-align: left;
`;

export const MenuButton = styled(Menu.Button)`
  display: inline-flex;
  justify-items: center;
  align-items: center;
  width: 100%;
  border-radius: ${getSizing("spacing.6")};
  padding: ${getSizing("spacing.2")} ${getSizing("spacing.4")};
  font-weight: bold;
  color: white;
`;
