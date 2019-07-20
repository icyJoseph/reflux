import React from "react";
import { Provider, Connect, useNotify } from "../";

/**
 * @section Constants
 */

export const INC = "inc";
export const DEC = "dec";
export const ADD_TAG = "add-tag";
export const CLEAR_TAGS = "clear-tags";
export const TICK = "tick";
export const ACTION_BUTTON = "action-button";
export const FORCE_ROOT = "force-root-node";
export const FORCE_APP = "force-app-node";
export const CONNECTED_BRANCH = "connected-branch";
export const TAGS_WRAPPER = "tags-wrapper";
export const INPUT_DATA_TESTID = "input-data-testid";

/**
 * @section Functions
 */

/**
 * @name noop
 */
const noop = () => {};

/**
 * @name reducer
 * @param {Object} state has shape {count: number}
 */

function reducer(state, action) {
  switch (action.type) {
    case INC:
      return { ...state, count: state.count + 1 };
    case DEC:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

/**
 *
 * @name queryReducer
 * @param {Object} state has shape {query: string, previous: string}
 */

const tagsReducer = (state, action) => {
  switch (action.type) {
    case ADD_TAG:
      return [...state, action.tag];
    case CLEAR_TAGS:
      return [];
    default:
      return state;
  }
};

/**
 * @param {Object} state
 * @description Maps state to an object with key:value => count:state
 * @return Object {count:Number}
 */
const selector = ({ count }) => ({ count });

/**
 * @param {Object} state
 * @description returns state as a tags array
 * @return Array [query: String, previous: String]
 */
const tagSelector = state => ({ tags: state });

/**
 * @section Hooks
 */

/**
 * @name useForceUpdate
 * @description Forces rendering of the component where it is declared
 */
const useForceUpdate = () => React.useReducer(state => !state, false)[1];

/**
 * @section Components
 */

/**
 * @name LabeledCountView Displays count and label
 */
const LabeledCountView = ({ count, label, spy }) => {
  spy(count);
  return <div data-testid={`${label}`}>{count}</div>;
};

/**
 *  @name ActionButton Displays button with a label. The button executes an action on Click
 */
const ActionButton = ({ label, onClick = () => {} }) => {
  return (
    <button data-testid={`${label}-${ACTION_BUTTON}`} onClick={onClick}>
      {label}
    </button>
  );
};

const AddTagButton = ({ tag }) => {
  const notify = useNotify();
  return (
    <ActionButton
      label={ADD_TAG}
      onClick={() => notify({ type: ADD_TAG, tag })}
    />
  );
};

/**
 * @name Input
 */
const Input = ({ tags = [] }) => {
  const [value, setValue] = React.useState("");
  const changeHandler = e => {
    e.preventDefault();
    return setValue(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={changeHandler}
        data-testid={INPUT_DATA_TESTID}
      />
      <AddTagButton tag={value} />
      <div data-testid={TAGS_WRAPPER}>
        {tags.map((tag, index) => (
          <span key={`${tag}-${index}`} data-testid={tag}>
            {tag}
          </span>
        ))}
      </div>
    </>
  );
};

const ConnectedInput = () => (
  <Connect
    reducer={tagsReducer}
    initialState={["a", "b"]}
    selector={tagSelector}
  >
    <Input />
  </Connect>
);

const ConnectedLabeledCountView = ({ spy }) => {
  /**
   *
   * @description pass initial State as an object,
   * and verify that it does not render unnecessarily
   *
   */
  return (
    <Connect reducer={reducer} initialState={{ count: 0 }} selector={selector}>
      <LabeledCountView label={CONNECTED_BRANCH} spy={spy} />
    </Connect>
  );
};

const ConnectedLabeledCountViewWithOwnState = ({ spy }) => {
  const [tick, setTick] = React.useState(0);
  const tickUp = () => setTick(x => x + 1);
  /**
   *
   * @description pass initial State as an object,
   * and verify that it does not render unnecessarily
   *
   */
  return (
    <>
      <Connect
        reducer={reducer}
        initialState={{ count: 0 }}
        selector={selector}
      >
        <LabeledCountView label={CONNECTED_BRANCH} spy={spy} tick={tick} />
        <span data-testid={TICK}>{tick}</span>
      </Connect>
      <ActionButton label={TICK} onClick={tickUp} />
    </>
  );
};

const ButtonControl = () => {
  const notify = useNotify();
  return (
    <>
      <ActionButton label={INC} onClick={() => notify({ type: INC })} />
      <ActionButton label={DEC} onClick={() => notify({ type: DEC })} />
      <ActionButton
        label={CLEAR_TAGS}
        onClick={() => notify({ type: CLEAR_TAGS })}
      />
    </>
  );
};

const AppNode = ({ spy }) => {
  const forceUpdate = useForceUpdate(); // to render the whole tree
  return (
    <div>
      <button data-testid={FORCE_APP} onClick={forceUpdate}>
        Force App Node
      </button>
      <ButtonControl />
      <ConnectedLabeledCountView spy={spy} />
      <ConnectedInput />
    </div>
  );
};

const AppNodeWithTickComponent = ({ spy }) => {
  const forceUpdate = useForceUpdate(); // to render the whole tree
  return (
    <div>
      <button data-testid={FORCE_APP} onClick={forceUpdate}>
        Force App Node
      </button>
      <ButtonControl />
      <ConnectedLabeledCountViewWithOwnState spy={spy} />
      <ConnectedInput />
    </div>
  );
};

const RootMock = ({ spy }) => {
  const forceUpdate = useForceUpdate(); // to render the whole tree, including provider
  return (
    <Provider>
      <AppNode spy={spy} />
      <button data-testid={FORCE_ROOT} onClick={forceUpdate}>
        Force Root
      </button>
    </Provider>
  );
};

export const RootMockWithTickComponent = ({ spy }) => {
  const forceUpdate = useForceUpdate(); // to render the whole tree, including provider
  return (
    <Provider>
      <AppNodeWithTickComponent spy={spy} />
      <button data-testid={FORCE_ROOT} onClick={forceUpdate}>
        Force Root
      </button>
    </Provider>
  );
};

export default RootMock;
