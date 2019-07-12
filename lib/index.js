import React, {
  useReducer,
  createContext,
  useContext,
  Children,
  useEffect
} from "react";

export function createMediator() {
  let participants = [];
  let listeners = [];

  function addParticipant(fn) {
    const participant = participants.length;
    participants.push(participant);
    listeners.push(fn);
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

const MediatorContext = createContext();

export function MediatorProvider({ mediator, children }) {
  return (
    <MediatorContext.Provider value={mediator}>
      {children}
    </MediatorContext.Provider>
  );
}

function useMediatorHook() {
  return useContext(MediatorContext);
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const addParticipant = useAddParticipant();

  useEffect(() => {
    const removeParticipant = addParticipant(dispatch);
    return () => removeParticipant();
  }, [addParticipant]);

  return Children.toArray(children).map(child => {
    const { props } = child;
    return { ...child, props: { ...props, ...selector(state) } };
  });
}
