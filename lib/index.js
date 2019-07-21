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

/**
 *
 * @deprecated After updating tests -> Remove
 *
 */
export function Connect({ reducer, initialState, selector, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addParticipant = useAddParticipant();

  useEffect(() => {
    const removeParticipant = addParticipant(dispatch);
    return () => removeParticipant();
  }, [addParticipant]);

  const selectorEval = useMemo(() => selector(state), [state]);

  const mergedProps = Children.toArray(children).reduce(
    (prev, { props }) => Object.assign(prev, props),
    {}
  );

  const deps = Object.values(mergedProps);

  const enhancedAndMemoizedChildren = useMemo(
    () =>
      Children.toArray(children).map(child => {
        const { props } = child;
        return { ...child, props: { ...props, ...selectorEval } };
      }),
    [selectorEval, ...deps]
  );

  return enhancedAndMemoizedChildren;
}

export function useConnect({ reducer, initialState, selector = x => x }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addParticipant = useAddParticipant();

  useEffect(() => {
    const removeParticipant = addParticipant(dispatch);
    return () => removeParticipant();
  }, [addParticipant]);

  const selectorEval = useMemo(() => selector(state), [state]);

  return selectorEval;
}
