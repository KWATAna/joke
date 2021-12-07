//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import "uu5g04-bricks";
import Config from "./config/config";
import { useItemList } from "../core/itemList/context/use-item-list";
//@@viewOff:imports

const ItemList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ItemList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokes: UU5.PropTypes.array.isRequired,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    items: [],
    onDelete: () => {},
    showModal: () => {},
  },
  //@@viewOff:defaultProps

  render({ deleteItem, show, modal }) {
    //@@viewOn:render
    const list = useItemList();
    function handleModal(item) {
      modal.current.open({
        header: item.name,
        content: item.desc,
        footer: <UU5.Bricks.Button content="Close" onClick={modal.current.close} />,
      });
    }
    return (
      <div>
        {list.map((item, key) => {
          if (item.id < show) {
            return (
              <UU5.Bricks.Card key={key}>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <UU5.Bricks.Rating value={item.rate} />
                <UU5.Bricks.Button onClick={() => deleteItem(item.id)} colorSchema="red">
                  <UU5.Bricks.Icon icon="mdi-delete" />
                </UU5.Bricks.Button>
                <UU5.Bricks.Button onClick={() => handleModal(item)} colorSchema="blue">
                  <UU5.Bricks.Icon icon="mdi-auto-fix" />
                </UU5.Bricks.Button>
              </UU5.Bricks.Card>
            );
          }
        })}
      </div>
    );
    //@@viewOff:render
  },
});

export default ItemList;
