import React from "react";
import { Card, CardHeader } from "@material-ui/core";
import { shallow } from "enzyme";

import { UnconnectedSummary as Summary } from "../Summary";

const props = {
  total: { balance: 100, currency: "USD" },
  currencies: ["USD", "AUD", "EUR"],
  onUpdateBalance: jest.fn(),
};
const wrapper = shallow(<Summary {...props} />);

describe("Summary", () => {
  it("should render a card view", () => {
    const card = wrapper.find(Card);

    expect(card).toBeDefined();
    expect(card.length).toBe(1);
  });

  it("should render the the card header", () => {
    const cardHeader = wrapper.find(CardHeader);

    expect(cardHeader).toBeDefined();
    expect(cardHeader.length).toBe(1);
    expect(cardHeader.props().title).toBe("👋 Welcome!");
  });

  it("should render the current date", () => {
    const time = wrapper.find(".time");
    expect(time).toBeDefined();
  });
});
