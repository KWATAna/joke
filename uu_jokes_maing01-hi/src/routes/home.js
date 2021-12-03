//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import Joke from "../bricks/joke"; // Add this line
import JokeList from "../bricks/joke-list";
import JokeProvider from "../bricks/joke-provider";
import JokeCreate from "../bricks/joke-create";


import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
import WelcomeRow from "../bricks/welcome-row.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  welcomeRow: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;
  
    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}
  
    .uu5-bricks-header {
      margin-top: 8px;
    }
    
    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
};

export const Home = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <div>
      <JokeProvider>
        {({ jokes, handleCreate, handleDelete }) => {
          return (
            <>
              <JokeCreate onCreate={handleCreate} />
              <JokeList jokes={jokes} onDelete={handleDelete} />
            </>
          );
        }}
      </JokeProvider>
    </div>
    );
    //@@viewOff:render
  },
});

export default Home;
