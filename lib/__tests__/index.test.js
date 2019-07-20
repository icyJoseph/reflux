import React from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import RootMock, {
  INC,
  DEC,
  ACTION_BUTTON,
  FORCE_ROOT,
  FORCE_APP,
  CONNECTED_BRANCH
} from "./app.mock";

const spy = jest.fn();
afterAll(cleanup);

describe("LabeledCountView only reacts to notifications", () => {
  spy.mockRestore();
  // render the root
  const { getByTestId } = render(<RootMock spy={spy} />);
  // find the action buttons
  const incButton = getByTestId(`${INC}-${ACTION_BUTTON}`);
  const decButton = getByTestId(`${DEC}-${ACTION_BUTTON}`);
  // find the force update buttons
  const forceUpdateRootButton = getByTestId(FORCE_ROOT);
  const forceUpdateAppButton = getByTestId(FORCE_APP);
  // find the count
  const count = getByTestId(CONNECTED_BRANCH);

  it("renders", () => {
    expect(incButton).toBeDefined();
    expect(decButton).toBeDefined();
    expect(count.textContent).toEqual("0");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(0);
  });

  it("Notify INC, increases the count", () => {
    act(() => {
      fireEvent.click(incButton);
    });
    expect(count.textContent).toEqual("1");
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(1);
  });
  it("Notice DEC twice, decreases the count twice", () => {
    act(() => {
      fireEvent.click(decButton);
    });
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledWith(0);
    act(() => {
      fireEvent.click(decButton);
    });
    expect(count.textContent).toEqual("-1");
    expect(spy).toHaveBeenCalledTimes(4);
    expect(spy).toHaveBeenCalledWith(-1);
  });

  it("force root update, does not increase render Connected branch", () => {
    act(() => {
      fireEvent.click(forceUpdateRootButton);
    });
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it("force app update, does not increase render Connected branch", () => {
    act(() => {
      fireEvent.click(forceUpdateAppButton);
    });
    expect(spy).toHaveBeenCalledTimes(4);
  });
});
