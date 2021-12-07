//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import JokeList from "../bricks/joke-list";
import JokeProvider from "../bricks/joke-provider";
import JokeCreate from "../bricks/joke-create";
import JokesTitle from "../bricks/jokes-title";
import JokesInstanceContext from "../bricks/jokes-instance-context";
import Lsi from "./jokes.lsi";
import JokeDetail from "../bricks/joke-detail";
import JokeUpdateForm from "../bricks/joke-update-form";

//@@viewOff:imports

const Jokes = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Jokes",
  //@@viewOff:statics

  render() {
    //@@viewOn:hooks
    const {
      data: { authorizedProfileList },
    } = useContext(JokesInstanceContext);
    const createJokeRef = useRef();
    const updateJokeRef = useRef();
    const deleteJokeRef = useRef();
    const updateFormRef = useRef();
    const detailRef = useRef();
    //@viewOff:hooks

    //@@viewOn:private
    function showError(lsi, params) {
      UU5.Environment.getPage()
        .getAlertBus()
        .addAlert({
          content: <UU5.Bricks.Lsi lsi={lsi} params={params} />,
          colorSchema: "red",
        });
    }

    async function handleCreateJoke(joke) {
      try {
        await createJokeRef.current(joke);
      } catch {
        showError(Lsi.createFailed, [joke.name]);
      }
    }

    /* eslint no-unused-vars: "off" */
    async function handleUpdateJoke(joke, values) {
      try {
        await updateJokeRef.current({ id: joke.id, ...values });
      } catch {
        showError(Lsi.updateFailed, [joke.name]);
      }
    }

    async function handleDeleteJoke(joke) {
      try {
        await deleteJokeRef.current({ id: joke.id });
      } catch {
        showError(Lsi.deleteFailed, [joke.name]);
      }
    }

    function isCreateAuthorized() {
      return authorizedProfileList.some(
        (profile) => profile === Config.Profiles.AUTHORITIES || profile === Config.Profiles.EXECUTIVES
      );
    }

    function openDetail(joke) {
      detailRef.current.open(joke);
    }
    function openUpdateForm(joke) {
      updateFormRef.current.open(joke);
    }
    //@@viewOff:private

    //@@viewOn:render
    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }

    function renderReady(jokes) {
      return (
        <>
          <JokesTitle jokes={jokes} />
          {isCreateAuthorized() && <JokeCreate onCreate={handleCreateJoke} />}
          <JokeList jokes={jokes} onDetail={openDetail} onUpdate={openUpdateForm} onDelete={handleDeleteJoke} />
          <JokeUpdateForm ref={updateFormRef} onSave={handleUpdateJoke} />
          <JokeDetail ref={detailRef} />
        </>
      );
    }

    function renderError(errorData) {
      switch (errorData.operation) {
        case "load":
        case "loadNext":
        default:
          return <UU5.Bricks.Error content="Error happened!" error={errorData.error} errorData={errorData.data} />;
      }
    }

    return (
      <UU5.Bricks.Container>
        <JokeProvider>
          {({ state, data, errorData, pendingData, handlerMap }) => {
            createJokeRef.current = handlerMap.createJoke;
            updateJokeRef.current = handlerMap.updateJoke;
            deleteJokeRef.current = handlerMap.deleteJoke;

            switch (state) {
              case "pending":
              case "pendingNoData":
                return renderLoad();
              case "error":
              case "errorNoData":
                return renderError(errorData);
              case "itemPending":
              case "ready":
              case "readyNoData":
              default:
                return renderReady(data);
            }
          }}
        </JokeProvider>
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  },
});

export default Jokes;
