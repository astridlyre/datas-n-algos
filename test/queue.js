import { Queue } from "../queue.js";
import { expect } from "chai";
import { describe, it } from "mocha";

describe("Queue", function () {
  it("Should allow enqueing", function () {
    const queue = new Queue();
    queue.enqueue("cats");
    expect(queue.toString()).to.equal("cats");
    expect(queue.length).to.equal(1);
  });

  it("Should allow dequeuing", function () {
    const queue = new Queue();
    queue.enqueue("cats").enqueue("dogs");
    const cats = queue.dequeue();
    expect(cats).to.equal("cats");
    expect(queue.toString()).to.equal("dogs");
    expect(queue.length).to.equal(1);
  });

  it("Should support iterating", function () {
    const queue = new Queue();
    const animals = ["cats", "dogs", "bulls", "falcons"];
    animals.forEach((a) => queue.enqueue(a));
    expect([...queue]).to.deep.equal(animals);
  });

  it("Should allow peeking", function () {
    const queue = new Queue();
    const nums = [1, 2, 3, 4, 5];
    expect(queue.isEmpty()).to.equal(true);
    nums.forEach((n) => queue.enqueue(n));
    expect(queue.peek()).to.equal(1);
    expect(queue.isEmpty()).to.equal(false);
  });
});
