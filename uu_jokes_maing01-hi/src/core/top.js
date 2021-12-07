//@@viewOn:imports
import Plus4U5 from "uu_plus4u5g01";
import { createVisualComponent, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import JokesInstanceContext from "../bricks/jokes-instance-context";
//@@viewOff:imports

const Top = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Top",
  //@@viewOff:statics

  render() {
    //@@viewOn:hooks
    const { data: jokesInstance } = useContext(JokesInstanceContext);
    //@@viewOff:hooks

    //@@viewOn:render
    const title = `${jokesInstance.name} [${jokesInstance.state}]`;

    return <Plus4U5.App.TopBt>{title}</Plus4U5.App.TopBt>;
    //@@viewOff:render
  },
});

export default Top;
