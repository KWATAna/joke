//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useContext } from "uu5g04-hooks";
import Calls from "calls";
import JokesInstanceContext from "./jokes-instance-context";
import Config from "./config/config";
import Css from "./joke-detail-content.css";
import Lsi from "./joke-detail-content.lsi";
//@@viewOff:imports

function Line({ icon, content }) {
  return (
    <div className={Css.line()}>
      <UU5.Bricks.Icon className={Css.icon()} icon={icon} />
      {content}
    </div>
  );
}

const JokeDetailContent = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeDetailContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      text: UU5.PropTypes.string,
      averageRating: UU5.PropTypes.number.isRequired,
      uuIdentity: UU5.PropTypes.string,
    }).isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    joke: null,
  },
  //@@viewOff:defaultProps

  render({ joke }) {
    //@@viewOn:hooks
    const {
      data: { categoryList },
    } = useContext(JokesInstanceContext);
    //@@viewOff:hooks

    //@@viewOn:private
    function buildCategoryNames() {
      // for faster lookup
      let categoryIds = new Set(joke.categoryList);
      return categoryList
        .reduce((acc, category) => {
          if (categoryIds.has(category.id)) {
            acc.push(category.name);
          }
          return acc;
        }, [])
        .join(", ");
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        {joke.text}
        {joke.image && (
          <UU5.Bricks.Image
            className={Css.image()}
            src={Calls.getCommandUri(`/uu-app-binarystore/getBinaryData?code=${joke.image}`)}
            authenticate
          />
        )}
        <div className={Css.ratingBox()}>
          <UU5.Bricks.Rating className={Css.rating()} value={joke.averageRating} />
          <UU5.Bricks.Lsi lsi={Lsi.votes} params={[joke.ratingCount]} />
        </div>

        <Line icon="mdi-tag-multiple" content={buildCategoryNames()} />
        <Line icon="mdi-account" content={joke.uuIdentityName} />
        <Line icon="mdi-calendar" content={<UU5.Bricks.DateTime value={joke.sys.cts} dateOnly />} />
      </div>
    );
    //@@viewOff:render
  },
});

export default JokeDetailContent;
