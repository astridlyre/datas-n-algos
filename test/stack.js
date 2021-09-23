import { Stack } from "../stack.js";
import { expect } from "chai";
import { describe, it } from "mocha";

describe("Stack", function () {
  it("Should allow pushing a new item", function () {
    const stack = new Stack();
    stack.push("cats");
    expect(stack.toString()).to.equal("cats");
    expect(stack.length).to.equal(1);
  });

  it("Should allow poping", function () {
    const stack = new Stack();
    stack.push("hello").push("world");
    const world = stack.pop();
    expect(world).to.equal("world");
    expect(stack.toString()).to.equal("hello");
  });

  it("Should allow iteration", function () {
    const stack = new Stack();
    const nums = [1, 2, 3, 4, 5];
    nums.forEach((n) => stack.push(n));
    expect([...stack]).to.deep.equal(nums.reverse());
    expect(stack.isEmpty()).to.equal(false);
  });

  it("Should allow peeking", function () {
    const stack = new Stack();
    stack.push("world").push("hello");
    const top = stack.peek();
    expect(top).to.equal("hello");
    expect(stack.toString()).to.equal("hello,world");
  });

  it("Should allow toArray method", function () {
    const stack = new Stack();
    stack.push("world").push("hello");
    expect(stack.toArray()).to.deep.equal(["hello", "world"]);
  });
});
