//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, SessionProvider } from "uu5g04-hooks";

import Config from "./config/config.js";
import JokeInstanceProvider from "../bricks/jokes-instance-provider";
import JokesInstanceContext from "../bricks/jokes-instance-context";
import SpaReady from "./spa-ready.js";
//@@viewOff:imports

const SpaAuthenticated = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Jokes",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <SessionProvider session={UU5.Environment.getSession()}>
        <JokeInstanceProvider>
          <JokesInstanceContext.Consumer>
            {({ state, errorData }) => {
              switch (state) {
                case "pending":
                case "pendingNoData":
                  return <UU5.Bricks.Loading />;
                case "error":
                case "errorNoData":
                  return <UU5.Bricks.Error error={errorData.error} />;
                case "ready":
                case "readyNoData":
                default:
                  return <SpaReady />;
              }
            }}
          </JokesInstanceContext.Consumer>
        </JokeInstanceProvider>
      </SessionProvider>
    );
    //@@viewOff:render
  },
});

export default SpaAuthenticated;
