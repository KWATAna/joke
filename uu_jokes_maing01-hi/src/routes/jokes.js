//@@viewOn:imports
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import JokeList from "../bricks/joke-list";
import JokeProvider from "../bricks/joke-provider";
import JokeCreate from "../bricks/joke-create";
//@@viewOff:imports

const Jokes = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Jokes",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <JokeProvider>
        {({ viewState, jokes, handleCreate, handleDelete }) => {
          return (
            <>
              <JokeCreate onCreate={handleCreate} />
              <JokeList jokes={jokes} onDelete={handleDelete} />
            </>
          );
        }}
      </JokeProvider>
    );
    //@@viewOff:render
  }
});

export default Jokes;