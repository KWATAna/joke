//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import JokesInstanceContext from "./jokes-instance-context";
//@@viewOff:imports

const JokeInstanceProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeInstanceProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:hooks
    const state = useDataObject({
      handlerMap: {
        load: Calls.loadJokesInstance,
      },
    });
    //@@viewOff:hooks

    //@@viewOn:render
    return <JokesInstanceContext.Provider value={state}>{children}</JokesInstanceContext.Provider>;
    //@@viewOff:render
  },
});

export default JokeInstanceProvider;
