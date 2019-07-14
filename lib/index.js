import React, {
  useReducer,
  createContext,
  useContext,
  Children,
  useEffect
} from "react";

export function createMediator() {
  let participants = [];

  function addParticipant(fn) {
    // TODO: add Global State
    const id = participants.length; // can be used to optimize the splice
    participants.push({ id, listener: fn });
    return function unsubscribe() {
      const index = participants.findIndex(current => current.id === id);
      participants.splice(index, 1);
    };
  }

  function notifyParticipants(payload) {
    participants.forEach(({ listener }) => listener(payload));
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
