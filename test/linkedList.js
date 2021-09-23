import { LinkedList, LinkedListNode } from "../linkedList.js";
import { expect } from "chai";
import { describe, it } from "mocha";

describe("Linked List", function () {
  describe("Testing LinkedListNode", function () {
    it("Should allow setting next", function () {
      const nodeA = new LinkedListNode("dogs", null, null);
      const nodeB = new LinkedListNode("cats", null, nodeA);
      expect(nodeB.next).to.equal(nodeA);
    });

    it("Should allow setting prev", function () {
      const nodeA = new LinkedListNode("cats", null, null);
      const nodeB = new LinkedListNode("dogs", nodeA, null);
      expect(nodeB.prev).to.equal(nodeA);
    });

    it("Should only permit setting next/prev to another LinkedListNode", function () {
      const createNodeNext = () => new LinkedListNode("cats", null, "dogs");
      const createNodePrev = () => new LinkedListNode("cats", "dogs", null);
      expect(createNodeNext).to.throw(
        "'next' must be instance of LinkedListNode",
      );
      expect(createNodePrev).to.throw(
        "'prev' must be instance of LinkedListNode",
      );
    });
  });

  describe("Testing LinkedList", function () {
    it("Should create head & tail null", function () {
      const list = new LinkedList();
      expect(list.toString()).to.equal("");
    });

    it("Should allow prepending a value", function () {
      const list = new LinkedList();
      list.prepend("cats");
      expect(list.toString()).to.equal("cats");
    });

    it("Should allow appending a value", function () {
      const list = new LinkedList();
      list.append("dogs");
      expect(list.toString()).to.equal("dogs");
    });

    it("Should allow prepending and appending", function () {
      const list = new LinkedList();
      list.prepend("hello").append("world");
      expect(list.toString()).to.equal("hello,world");
    });

    it("Should allow deleting head", function () {
      const list = new LinkedList();
      list.prepend("world").prepend("hello");
      const hello = list.deleteHead();
      expect(list.toString()).to.equal("world");
      expect(hello).to.equal("hello");
    });

    it("Should allow deleting tail", function () {
      const list = new LinkedList();
      list.append("hello").append("world");
      const world = list.deleteTail();
      expect(list.toString()).to.equal("hello");
      expect(world).to.equal("world");
    });

    it("Should allow iterating over nodes", function () {
      const list = new LinkedList();
      list.append("hello").append("world");
      expect([...list].map((node) => node.value)).to.deep.equal([
        "hello",
        "world",
      ]);
    });

    it("Should allow replacing a node", function () {
      const list = new LinkedList();
      ["my", "name", "is", "fjlksaj"].forEach((v) => list.append(v));
      expect(list.replace("fjlksaj", "astrid").toString()).to.equal(
        "my,name,is,astrid",
      );
    });

    it("Should allow deleting a node", function () {
      const list = new LinkedList();
      ["my", "name", "is", "fjlksaj"].forEach((v) => list.append(v));
      list.delete("fjlksaj");
      expect(list.toString()).to.equal("my,name,is");
    });

    it("Should allow map function", function () {
      const list = new LinkedList();
      const people = [
        { name: "John", id: 1, age: 32 },
        { name: "Kim", id: 2, age: 28 },
        { name: "Kevin", id: 3, age: 22 },
        { name: "Stacey", id: 4, age: 27 },
      ];
      for (const person of people) {
        list.append(person);
      }
      expect(
        list.map((person) => ({ ...person, name: person.name.toUpperCase() }))
          .toArray(),
      ).to.deep.equal(
        people.map((person) => ({
          ...person,
          name: person.name.toUpperCase(),
        })),
      );
    });

    it("Should find a node", function () {
      const list = new LinkedList();
      const cats = [
        { name: "Kippums" },
        { name: "Roger" },
        { name: "Cat" },
      ];
      cats.forEach((cat) => list.append(cat));
      expect(list.find((cat) => cat.name === "Cat")).to.deep.equal(cats[2]);
    });

    it("Should support reduce function", function () {
      const list = new LinkedList();
      [1, 2, 3, 4, 5].forEach((n) => list.append(n));
      expect(list.reduce((acc, n) => acc + n, 0)).to.equal(15);
    });

    it("Should allow reversing", function () {
      const list = new LinkedList();
      list.append("world").append("hello");
      expect(list.reverse().toString()).to.equal("hello,world");
    });
  });
});
