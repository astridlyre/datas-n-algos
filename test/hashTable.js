import { HashTable } from "../hashTable.js";
import { expect } from "chai";
import { describe, it } from "mocha";

describe("HashTable", function () {
  it("Should allow setting an item", function () {
    const ht = new HashTable();
    ht.set("cats", ["bim", "cutie"]);
    expect(ht.get("cats")).to.deep.equal(["bim", "cutie"]);
  });

  it("Should return undefined for an unset item", function () {
    const ht = new HashTable();
    expect(ht.get("cats")).to.equal(undefined);
  });

  it("Should allow iteration", function () {
    const ht = new HashTable();
    ht.set("cats", ["bim"]);
    ht.set("dogs", "roof");
    expect([...ht]).to.deep.equal([["cats", ["bim"]], ["dogs", "roof"]]);
  });

  it("Should allow deleting an item", function () {
    const ht = new HashTable();
    ht.set("cats", "kippums");
    const cats = ht.delete("cats");
    expect(ht.get("cats")).to.equal(undefined);
    expect(cats).to.deep.equal({ key: "cats", value: "kippums" });
  });
});
