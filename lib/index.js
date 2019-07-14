import React, {
  useReducer,
  createContext,
  useContext,
  Children,
  useEffect
} from "react";

export function createMediator(reducer, initialState) {
  let participants = [];
  const globalState = reducer(initialState, {});

  function addParticipant(fn) {
    const id = participants.length; // can be used to optimize the splice
    participants.push({ id, listener: fn });
    return function unsubscribe() {
      const index = participants.findIndex(current => current.id === id);
      participants.splice(index, 1);
    };
  }

  function notifyGlobalState(payload) {
    globalState = reducer(globalState, payload);
    return notifyParticipants({ ...payload, globalState });
  }

  function notifyParticipants(payload) {
    participants.forEach(({ listener }) => listener(payload));
  }

  return { addParticipant, notifyParticipants, notifyGlobalState };
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

export function useNotifyGlobalState() {
  return useMediatorHook().notifyGlobalState;
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
