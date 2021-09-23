import { LinkedList } from "./linkedList.js";

export class Stack {
  #list = new LinkedList();

  push(value) {
    this.#list.prepend(value);
    return this;
  }

  pop() {
    return this.#list.deleteHead();
  }

  toString(cb) {
    return this.#list.toString(cb);
  }

  toArray() {
    return this.#list.toArray();
  }

  isEmpty() {
    return this.#list.length === 0;
  }

  peek() {
    return this.#list.head;
  }

  get length() {
    return this.#list.length;
  }

  *[Symbol.iterator]() {
    for (const node of this.#list) {
      yield node.value;
    }
  }
}
