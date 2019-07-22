import React, {
  useReducer,
  createContext,
  useContext,
  Children,
  useEffect,
  useMemo
} from "react";

function create() {
  let participants = [];

  function addParticipant(fn) {
    const id = participants.length;
    participants.push({ id, listener: fn });
    return function unsubscribe() {
      const index = participants.findIndex(current => current.id === id);
      participants.splice(index, 1);
    };
  }

  function notify(payload) {
    participants.forEach(({ listener }) => listener(payload));
  }

  return { addParticipant, notify };
}

const MediatorContext = createContext();

export function Provider({ children }) {
  const value = useMemo(() => create(), []);
  return (
    <MediatorContext.Provider value={value}>
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

export function useNotify() {
  return useMediatorHook().notify;
}

export function useConnect(
  reducer,
  initialState,
  selector = x => x,
  initializer = x => x
) {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  const addParticipant = useAddParticipant();

  useEffect(() => {
    const removeParticipant = addParticipant(dispatch);
    return () => removeParticipant();
  }, [addParticipant]);

  const selectorEval = useMemo(() => selector(state), [state]);

  return selectorEval;
}
