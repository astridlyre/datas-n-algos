import { LinkedList } from "./linkedList.js";

export class Queue {
  #list = new LinkedList();

  enqueue(value) {
    this.#list.append(value);
    return this;
  }

  dequeue(value) {
    return this.#list.deleteHead(value);
  }

  toString(cb) {
    return this.#list.toString(cb);
  }

  toArray() {
    return this.#list.toArray();
  }

  get length() {
    return this.#list.length;
  }

  isEmpty() {
    return this.#list.length === 0;
  }

  peek() {
    return this.#list.head;
  }

  *[Symbol.iterator]() {
    for (const node of this.#list) {
      yield node.value;
    }
  }
}
