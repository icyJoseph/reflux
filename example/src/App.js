import React from "react";

import { Mediated, useNotifyParticipants } from "react-mediator";

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

function Counter({ count }) {
  return <div>{count}</div>;
}

function Buttons() {
  const notify = useNotifyParticipants();
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
        <Counter count={count} />
        <button onClick={() => setCount(x => x + 1)}>+</button>
        <button onClick={() => setCount(x => x - 1)}>-</button>
      </section>
      <section>
        <h3>Mediated Broadcasting Buttons</h3>
        <Buttons />
      </section>
      <section>
        <h3>Mediated listener Counters</h3>
        <Mediated reducer={reducer} initialState={0} selector={selector}>
          <Counter />
          <Counter />
          <Counter />
        </Mediated>
      </section>
    </div>
  );
}

export default App;
