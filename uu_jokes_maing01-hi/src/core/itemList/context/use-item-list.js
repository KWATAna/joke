//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import { ItemListContext } from "./item-list-context";
//@@viewOff:imports

export function useItemList() {
  return useContext(ItemListContext);
}
