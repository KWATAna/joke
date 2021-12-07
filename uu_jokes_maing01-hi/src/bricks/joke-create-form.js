//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsiValues, useContext, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./joke-create-form.lsi";
import JokesIntanceContext from "./jokes-instance-context";
//@@viewOff:imports

const JokeCreateForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeCreateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSave: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSave: () => {},
    onCancel: () => {}
  },
  //@@viewOff:defaultProps

  render({ onSave, onCancel }) {
    //@@viewOn:hooks
    const inputLsi = useLsiValues(Lsi);
    const imageRef = useRef();

    const {
      data: { categoryList }
    } = useContext(JokesIntanceContext);
    //@@viewOn:hooks

    //@@viewOn:private
    function validateText(opt) {
      let result = { feedback: "initial", value: opt.value };
      // when there is no event, validation comes from "isValid" method
      if (opt.event === undefined) {
        // text is empty, check file
        if (!opt.value && !imageRef.current.getValue()) {
          result.feedback = "error";
          result.message = <UU5.Bricks.Lsi lsi={Lsi.textOrFile} />;
          opt.component.setFeedback(result.feedback, result.message);
        }
      }
      return result;
    }
    //@@viewOff:private

    //@@viewOn:render
    function renderCategories() {
      return categoryList.map(category => (
        <UU5.Forms.Select.Option value={category.id} key={category.id}>
          {category.name}
        </UU5.Forms.Select.Option>
      ));
    }

    return (
      <UU5.Forms.ContextSection
        level={2}
        header={
          <UU5.Forms.ContextHeader
            content={<UU5.Bricks.Lsi lsi={Lsi.header} />}
            info={<UU5.Bricks.Lsi lsi={Lsi.info} />}
          />
        }
      >
        <UU5.Forms.ContextForm onSave={onSave} onCancel={onCancel}>
          <UU5.Forms.Text label={inputLsi.name} name="name" inputAttrs={{ maxLength: 255 }} required />

          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Select label={inputLsi.category} name="categoryList" multiple>
                {renderCategories()}
              </UU5.Forms.Select>
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.File ref_={imageRef} label={inputLsi.image} name="image" />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>

          <UU5.Forms.TextArea
            label={inputLsi.text}
            name="text"
            inputAttrs={{ maxLength: 4000 }}
            onValidate={validateText}
            autoResize
          />

          <UU5.Forms.ContextControls buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit} /> }} />
        </UU5.Forms.ContextForm>
      </UU5.Forms.ContextSection>
    );
    //@@viewOff:render
  }
});

export default JokeCreateForm;