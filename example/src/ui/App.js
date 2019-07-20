import React from "react";

import { Connect, useNotify } from "reflux";

const INC = "+";
const DEC = "-";
const selector = state => ({ count: state });
function reducer(count, action) {
  switch (action.type) {
    case INC:
      return count + 1;
    case DEC:
      return count - 1;
    default:
      return count;
  }
}

function nestedStateReducer(state, action) {
  switch (action.type) {
    case INC:
      return { ...state, result: { count: state.result.count + 1 } };
    case DEC:
      return { ...state, result: { count: state.result.count - 1 } };
    default:
      return state;
  }
}

function Counter({ count, name }) {
  console.log("Counter render phase", name);
  return <div>{count}</div>;
}

function Buttons() {
  const notify = useNotify();
  const notifier = type => e => {
    e.preventDefault();
    notify({ type });
  };
  const actions = [{ type: INC }, { type: DEC }];
  return actions.map(({ type }) => (
    <button key={type} onClick={notifier(type)}>
      {type}
    </button>
  ));
}

const useForceUpdate = () => React.useReducer(state => !state, false)[1];

export function App() {
  const forceUpdate = useForceUpdate();
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>React Mediator</h1>
      <button onClick={forceUpdate}>Force Update three</button>
      <section>
        <h3>Regular useState Hook</h3>
        <Counter count={count} name="free" />
        <button onClick={() => setCount(x => x + 1)}>+</button>
        <button onClick={() => setCount(x => x - 1)}>-</button>
      </section>
      <section>
        <h3>Mediated Broadcasting Buttons</h3>
        <Buttons />
      </section>
      <section>
        <h3>Mediated listener Counters</h3>
        <Connect reducer={reducer} initialState={0} selector={selector}>
          <Counter name="connect-0" />
          <Counter name="connect-1" />
          <Counter name="connect-2" />
        </Connect>
      </section>
      <section>
        <h3>Nested state reducer</h3>
        <Connect
          reducer={nestedStateReducer}
          initialState={{ result: { count: 10 } }}
          selector={({ result: { count } }) => ({ count })}
        >
          <Counter name="connect-3" />
          <Counter name="connect-4" />
        </Connect>
      </section>
    </div>
  );
}

export default App;
