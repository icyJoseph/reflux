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

  function notifyParticipants(payload) {
    participants.forEach(({ listener }) => listener(payload));
  }

  return { addParticipant, notifyParticipants };
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

export function useNotifyParticipants() {
  return useMediatorHook().notifyParticipants;
}

export function Connect({
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

  const enhancedAndMemoizedChildren = useMemo(
    () =>
      Children.toArray(children).map(child => {
        const { props } = child;
        return { ...child, props: { ...props, ...selector(state) } };
      }),
    [state]
  );

  return enhancedAndMemoizedChildren;
}
