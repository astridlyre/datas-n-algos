import { LinkedList } from "./linkedList.js";

const DEFAULT_BUCKET_SIZE = 32;

export class HashTable {
  #buckets = new Array(DEFAULT_BUCKET_SIZE).fill(null).map(() =>
    new LinkedList()
  );

  set(key, value) {
    const list = this.#buckets[this.#hash(key)];
    const node = list.find((val = {}) => val.key === key);
    if (!node) {
      list.append({ key, value });
    } else {
      node.value.value = value;
    }
    return this;
  }

  get(key) {
    const list = this.#buckets[this.#hash(key)];
    const node = list.find((val = {}) => val.key === key);
    return node ? node.value.value : undefined;
  }

  delete(key) {
    const list = this.#buckets[this.#hash(key)];
    return list.delete((item) => item.key === key);
  }

  #hash(key) {
    let hashCode = 0;
    [...key].forEach((char) => hashCode += char.charCodeAt(0));
    return hashCode % this.#buckets.length;
  }

  *[Symbol.iterator]() {
    for (
      const pair of this.#buckets.map((bucket) =>
        bucket.map(({ key, value }) => [key, value]).toArray()
      ).flat()
    ) {
      yield pair;
    }
  }
}
