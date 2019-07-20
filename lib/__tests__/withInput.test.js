import React from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import RootMock, {
  INC,
  DEC,
  ADD_TAG,
  CLEAR_TAGS,
  ACTION_BUTTON,
  FORCE_ROOT,
  FORCE_APP,
  CONNECTED_BRANCH,
  TAGS_WRAPPER,
  INPUT_DATA_TESTID
} from "./app.mock";

const spy = jest.fn();
afterAll(cleanup);

describe("LabeledCountView and Input interact", () => {
  spy.mockRestore();

  // render the root
  const { getByTestId } = render(<RootMock spy={spy} />);
  // count buttons
  const incButton = getByTestId(`${INC}-${ACTION_BUTTON}`);
  const decButton = getByTestId(`${DEC}-${ACTION_BUTTON}`);
  // find the action buttons for the Input
  const addTagButton = getByTestId(`${ADD_TAG}-${ACTION_BUTTON}`);
  const clearTagsButton = getByTestId(`${CLEAR_TAGS}-${ACTION_BUTTON}`);
  // tags wrapper
  const tagsWrapper = getByTestId(TAGS_WRAPPER);
  // input element
  const inputElement = getByTestId(INPUT_DATA_TESTID);
  // find the force update buttons
  const forceUpdateRootButton = getByTestId(FORCE_ROOT);
  const forceUpdateAppButton = getByTestId(FORCE_APP);
  // find the count
  const count = getByTestId(CONNECTED_BRANCH);

  it("renders without tags and an input element", () => {
    expect(tagsWrapper.children).toHaveLength(2);
    expect(tagsWrapper.children[0].textContent).toEqual("a");
    expect(tagsWrapper.children[1].textContent).toEqual("b");
    expect(inputElement).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("adds a Tag but does not trigger the spy on LabeledCountView", () => {
    act(() => {
      fireEvent.change(inputElement, { target: { value: "new" } });
    });
    expect(inputElement.value).toEqual("new");

    act(() => {
      fireEvent.click(addTagButton);
    });
    expect(tagsWrapper.children).toHaveLength(3);
    expect(tagsWrapper.children[2].textContent).toEqual("new");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("keeps value on Input, and tags unchaged after force updates", () => {
    act(() => {
      fireEvent.click(forceUpdateRootButton);
    });
    expect(tagsWrapper.children).toHaveLength(3);
    expect(tagsWrapper.children[2].textContent).toEqual("new");
    expect(inputElement.value).toEqual("new");
    expect(spy).toHaveBeenCalledTimes(1);

    act(() => {
      fireEvent.click(forceUpdateAppButton);
    });
    expect(tagsWrapper.children).toHaveLength(3);
    expect(tagsWrapper.children[2].textContent).toEqual("new");
    expect(inputElement.value).toEqual("new");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("clears up all tags", () => {
    act(() => {
      fireEvent.click(clearTagsButton);
    });
    expect(tagsWrapper.children).toHaveLength(0);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
