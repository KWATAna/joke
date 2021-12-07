//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useRef, useImperativeHandle } from "uu5g04-hooks";
import Config from "./config/config";
import JokeDetailContent from "./joke-detail-content";
import Css from "./joke-detail.css";
//@@viewOff:imports

const JokeDetail = createVisualComponentWithRef({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeDetail",
  //@@viewOff:statics

  render(props, ref) {
    //@@viewOn:hooks
    const modalRef = useRef();

    useImperativeHandle(ref, () => ({
      open: (joke) => {
        modalRef.current.open({
          header: joke.name,
          content: <JokeDetailContent joke={joke} />,
          className: Css.main(),
        });
      },
    }));
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return <UU5.Bricks.Modal ref_={modalRef} />;
    //@@viewOff:render
  },
});

export default JokeDetail;
