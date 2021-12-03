//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const Joke = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Joke",
  //@@viewOff:statics

  //@@viewOn:propTypes
 //@@viewOn:propTypes
propTypes: {
    joke: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      text: UU5.PropTypes.string.isRequired,
      averageRating: UU5.PropTypes.number.isRequired
    }),
    colorSchema: UU5.PropTypes.string,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
   },
   //@@viewOff:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    joke: null,
    colorSchema: "blue",
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {}
  },
  //@@viewOff:defaultProps

  render({ joke, colorSchema, onDelete }) {
    //@@viewOn:private
    function handleDelete() {
      onDelete(joke);
    }
    //@@viewOff:private

    //@@viewOn:render
    function renderHeader() {
      return (
        <>
          {joke.name}
          <UU5.Bricks.Button onClick={handleDelete} colorSchema="red">
            <UU5.Bricks.Icon icon="mdi-delete" />
          </UU5.Bricks.Button>
        </>
      );
    }

    if (!joke) {
      return null;
    }

    return (
      <UU5.Bricks.Card header={renderHeader()} colorSchema={colorSchema}>
        <div>{joke.text}</div>
        <UU5.Bricks.Rating value={joke.averageRating} />
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  }
});

export default Joke;