import {expect} from "chai";
import * as max from "../../../src/application/models/OneRepMax";
import {Set} from "../../../src/application/models/Set";

function DummySet(weight, reps) {
  this.resistance = weight;
  this.reps = reps;
}

const set6x10 = new DummySet(10, 6);
const set4x40 = new DummySet(40, 4);

describe("brzycki", () => {
  it("gets expected result for 6 x 10", () => {
    const result = max.brzycki.calculate()(set6x10);
    expect(Math.round(result)).to.equal(12)
  });
  it("gets expected result for 4 x 40", () => {
    const result = max.brzycki.calculate()(set4x40);
    expect(Math.round(result)).to.equal(44)
  });
});

describe("epley", () => {
  it("gets expected result for 6 x 10", () => {
    const result = max.epley.calculate()(set6x10);
    expect(Math.round(result)).to.equal(12)
  });
  it("gets expected result for 4 x 40", () => {
    const result = max.epley.calculate()(set4x40);
    expect(Math.round(result)).to.equal(45)
  });
});

describe("landers", () => {
  it("gets expected result for 6 x 10", () => {
    const result = max.landers.calculate()(set6x10);
    expect(Math.round(result)).to.equal(12)
  });
  it("gets expected result for 4 x 40", () => {
    const result = max.landers.calculate()(set4x40);
    expect(Math.round(result)).to.equal(44)
  });
});

describe("lombardi", () => {
  it("gets expected result for 6 x 10", () => {
    const result = max.lombardi.calculate()(set6x10);
    expect(Math.round(result)).to.equal(12)
  });
  it("gets expected result for 4 x 40", () => {
    const result = max.lombardi.calculate()(set4x40);
    expect(Math.round(result)).to.equal(46)
  });
});

describe("mayhew", () => {
  it("gets expected result for 6 x 10", () => {
    const result = max.mayhew.calculate()(set6x10);
    expect(Math.round(result)).to.equal(12)
  });
  it("gets expected result for 4 x 40", () => {
    const result = max.mayhew.calculate()(set4x40);
    expect(Math.round(result)).to.equal(47)
  });
});

describe("oConnor", () => {
  it("gets expected result for 6 x 10", () => {
    const result = max.oConnor.calculate()(set6x10);
    expect(Math.round(result)).to.equal(12)
  });
  it("gets expected result for 4 x 40", () => {
    const result = max.oConnor.calculate()(set4x40);
    expect(Math.round(result)).to.equal(44)
  });
});

describe("wathan", () => {
  it("gets expected result for 6 x 10", () => {
    const result = max.wathan.calculate()(set6x10);
    expect(Math.round(result)).to.equal(12)
  });
  it("gets expected result for 4 x 40", () => {
    const result = max.wathan.calculate()(set4x40);
    expect(Math.round(result)).to.equal(45)
  });
});

describe("baechle", () => {
  it("gets expected result for 6 x 10", () => {
    const result = max.baechle.calculate()(set6x10);
    expect(Math.round(result)).to.equal(12)
  });
  it("gets expected result for 4 x 40", () => {
    const result = max.baechle.calculate()(set4x40);
    expect(Math.round(result)).to.equal(45)
  });
});