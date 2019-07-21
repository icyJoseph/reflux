import React from "react";

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

function TodoCounter({ count = 0 }) {
  return (
    <div>
      <div>Total: {count}</div>
      <div>Closed: {count}</div>
    </div>
  );
}

// function Buttons() {
//   const notify = useNotify();
//   const notifier = type => e => {
//     e.preventDefault();
//     notify({ type });
//   };
//   const actions = [{ type: INC }, { type: DEC }];
//   return actions.map(({ type }) => (
//     <button key={type} onClick={notifier(type)}>
//       {type}
//     </button>
//   ));
// }

export default TodoCounter;
