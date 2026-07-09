import { createNone, createSome, isNone, isSome, optionConversion } from "../../src/option";
import { assert, describe, expect, it } from "vitest";

describe("option", () => {
    it("createSome で作った値は Some型になる", () => {
        const some = createSome("value");

        expect(some.kind).toBe("some");
        assert(some.kind === "some");
        expect(some.value).toBe("value");
    });

    it("createNone で作った値は None", () => {
        const none = createNone<never>();

        expect(none.kind).toBe("none");
    });

    it("isSome は some でない場合 false を返す", () => {
        const none = createNone<never>();
        expect(isSome(none)).toBeFalsy();
    });

    it("isNone は none でない場合 false を返す", () => {
        const none = createNone<never>();
        expect(isNone(none)).toBeTruthy();
    });

    it("isSomeでsomeの場合はtrueが返ってくる", () => {
        const some = createSome("value");

        expect(isSome(some)).toBeTruthy();
    });

    it("isSomeでnoneの場合にはfalseが返ってくる", () => {
        const some = createSome("value");

        expect(isNone(some)).toBeFalsy();
    });

    it("string型を与えたらSome型が返ってくる", () => {
        const result = optionConversion("string");

        expect(isSome(result)).toBeTruthy();
        assert(isSome(result));

        expect(result.value).toBe("string");
    });

    it("nullを渡したらNone型が返ってくる", () => {
        const result = optionConversion(null);

        expect(isNone(result)).toBeTruthy();
    });

    it("undefinedを渡したらNone型が返ってくる", () => {
        const result = optionConversion(undefined);

        expect(isNone(result)).toBeTruthy();
    });
});
