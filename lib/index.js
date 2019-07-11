import React from "react";

const hash = x => x;
const head = ([head]) => head;

export function createMediator() {
  let participants = [];
  let listeners = [];

  function addParticipant(...fns) {
    const participant = hash(participants.length);
    participants.push(participant);
    listeners.push(head(fns));
    return function unsubscribe() {
      const index = participants.indexOf(participant);
      participants.slice(index, 1);
      listeners.splice(index, 1);
    };
  }

  function notifyParticipants(payload) {
    listeners.forEach(listener => listener(payload));
  }

  return { addParticipant, notifyParticipants };
}

const MediatorContext = React.createContext();

export function MediatorProvider({ mediator, children }) {
  return (
    <MediatorContext.Provider value={mediator}>
      {children}
    </MediatorContext.Provider>
  );
}

function useMediatorHook() {
  return React.useContext(MediatorContext);
}

function useAddParticipant() {
  return useMediatorHook().addParticipant;
}

export function useNotifyParticipants() {
  return useMediatorHook().notifyParticipants;
}

export function Mediated({
  reducer,
  initialState,
  selector = x => x,
  children
}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const addParticipant = useAddParticipant();

  React.useEffect(() => {
    const removeParticipant = addParticipant(dispatch);
    return () => removeParticipant();
  }, [addParticipant]);

  // should it enfonce only one Child?
  return React.Children.toArray(children).map(child => {
    const { props } = child;
    return { ...child, props: { ...props, ...selector(state) } };
  });
}
