// Copies enumerable properties
function deepCopy(item) {
  if (Array.isArray(item)) {
    return item.map((val) => deepCopy(val));
  }
  if (typeof item === "object") {
    return Object.fromEntries(
      Object.entries(item).map(([key, val]) => [key, deepCopy(val)]),
    );
  }
  return item;
}

function equalOrCall(item, valOrFunc) {
  return typeof valOrFunc === "function" ? valOrFunc(item) : item === valOrFunc;
}

export class LinkedListNode {
  #next = null;
  #prev = null;
  #value = null;

  constructor(value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }

  get next() {
    return this.#next;
  }

  set next(node) {
    if (node instanceof LinkedListNode || node === null) {
      this.#next = node;
    } else {
      throw new TypeError("'next' must be instance of LinkedListNode");
    }
  }

  get prev() {
    return this.#prev;
  }

  set prev(node) {
    if (node instanceof LinkedListNode || node === null) {
      this.#prev = node;
    } else {
      throw new TypeError("'prev' must be instance of LinkedListNode");
    }
  }

  get value() {
    return deepCopy(this.#value);
  }

  set value(newValue) {
    this.#value = newValue;
  }

  toString(cb) {
    return cb ? cb(this.#value) : `${this.#value}`;
  }
}

export class LinkedList {
  #head = null;
  #tail = null;
  #length = 0;

  get length() {
    return this.#length;
  }

  get head() {
    return this.#head.value;
  }

  get tail() {
    return this.#tail.value;
  }

  prepend(value) {
    if (!this.#head) {
      this.#head = new LinkedListNode(value, null, this.#head);
    } else {
      this.#head.prev = new LinkedListNode(value, null, this.#head);
      this.#head = this.#head.prev;
    }
    if (!this.#tail) this.#tail = this.#head;
    this.#length++;
    return this;
  }

  append(value) {
    if (!this.#tail) {
      this.#tail = new LinkedListNode(value, this.#tail, null);
    } else {
      this.#tail.next = new LinkedListNode(value, this.#tail, null);
      this.#tail = this.#tail.next;
    }
    if (!this.#head) this.#head = this.#tail;
    this.#length++;
    return this;
  }

  delete(value) {
    if (equalOrCall(this.#head.value, value)) {
      const result = this.#head.value;
      this.#head = this.#head.next;
      this.#length--;
      return result;
    }
    for (const node of this) {
      if (equalOrCall(node.value, value)) {
        if (node === this.#tail) this.#tail = node.prev;
        node.prev.next = node.next;
        this.#length--;
        return node.value;
      }
    }
    return null;
  }

  replace(oldValue, newValue) {
    for (const node of this) {
      if (equalOrCall(node.value, oldValue)) {
        node.value = typeof newValue === "function"
          ? newValue(node.value)
          : newValue;
        return this;
      }
    }
    return this;
  }

  deleteHead() {
    const result = this.#head;
    if (!result) return null;
    this.#head = result.next;
    this.#head.prev = null;
    result.next = null;
    this.#length--;
    return result.value;
  }

  deleteTail() {
    const result = this.#tail;
    if (!result) return null;
    this.#tail = result.prev;
    this.#tail.next = null;
    result.prev = null;
    this.#length--;
    return result.value;
  }

  map(fn) {
    let result = new LinkedList();
    for (const node of this) {
      result = result.append(fn(node.value, result.length));
    }
    return result;
  }

  reduce(fn, initialValue = this.#head) {
    let result = initialValue;
    for (const node of this) {
      if (result === this.#head) continue;
      result = fn(result, node.value);
    }
    return result;
  }

  find(fn) {
    if (fn(this.#head?.value)) return this.#head;
    for (const node of this) {
      if (fn(node.value)) return node.value;
    }
    return null;
  }

  toArray() {
    const result = [];
    for (const node of this) {
      result.push(node.value);
    }
    return result;
  }

  toString(cb) {
    const result = [];
    for (const node of this) {
      result.push(node.toString(cb));
    }
    return result.toString();
  }

  reverse() {
    const result = new LinkedList();
    for (const node of this) {
      result.prepend(node.value);
    }
    return result;
  }

  *[Symbol.iterator]() {
    let cursor = this.#head;
    while (cursor) {
      yield cursor;
      cursor = cursor.next;
    }
  }
}
