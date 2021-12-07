//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import Joke from "./joke";
//@@viewOff:imports

const JokeList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeList",
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
    jokes: [],
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render({ jokes, onLoad, onDetail, onUpdate, onDelete }) {
    //@@viewOn:render
    function renderItem(item) {
      return (
        <Joke joke={item.data.data} colorSchema="green" onDetail={onDetail} onUpdate={onUpdate} onDelete={onDelete} />
      );
    }

    function renderError({ reload }) {
      return <UU5.Bricks.Button onClick={reload} content="Load more (auto-load failed)" />;
    }

    if (jokes.length === 0) {
      return <UU5.Common.Error content="No jokes!" />;
    }

    return (
      <Uu5Tiles.Grid
        data={jokes}
        tileHeight="auto"
        tileMinWidth={200}
        tileMaxWidth={400}
        tileSpacing={8}
        rowSpacing={8}
      >
        {renderItem}
      </Uu5Tiles.Grid>
    );
    //@@viewOff:render
  },
});

export default JokeList;
