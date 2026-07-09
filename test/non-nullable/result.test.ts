import {
    checkPromiseReturn,
    checkPromiseVoid,
    checkResultReturn,
    checkResultVoid,
    createErr,
    createOk,
    isErr,
    isOk,
    UNIT,
} from "../../src/result";
import { assert, describe, expect, it } from "vitest";

describe("result", () => {
    it("createOk で作った値は isOK が true になる", () => {
        const ok = createOk("value");

        expect(ok.kind).toBe("ok");
        assert(ok.kind === "ok");

        expect(ok.value).toBe("value");
    });

    it("createErr で作った値は isErr が true になる", () => {
        const err = createErr("err");

        expect(err.kind).toBe("ng");
        assert(err.kind === "ng");

        expect(err.err).toBe("err");
    });

    it("isOk は ok である場合 true を返す", () => {
        const ok = createOk("value");

        expect(isOk(ok)).toBeTruthy();
    });

    it("isOk は ok でない場合 false を返す", () => {
        const err = createErr("err");

        expect(isOk(err)).toBeFalsy();
    });

    it("isErr は err である場合 true を返す", () => {
        const err = createErr("err");

        expect(isErr(err)).toBeTruthy();
    });

    it("isErr は err でない場合 false を返す", () => {
        const ok = createOk("value");

        expect(isErr(ok)).toBeFalsy();
    });

    it("checkResultReturn は成功時に ok を返す", () => {
        const res = checkResultReturn({
            fn: () => "ret",
            err: () => createErr("err"),
        });

        expect(isOk(res)).toBeTruthy();
        assert(isOk(res));

        expect(res.value).toBe("ret");
    });

    it("checkResultReturn は例外時に ng を返す", () => {
        const res = checkResultReturn({
            fn: () => {
                throw new Error("boom");
            },
            err: () => createErr("myErr"),
        });

        expect(isErr(res)).toBeTruthy();
        assert(isErr(res));

        expect(res.err).toBe("myErr");
    });

    it("checkResultReturn は成功時でも finalFn を呼ぶ", () => {
        let called = false;

        checkResultReturn({
            fn: () => "ret",
            err: () => createErr("err"),
            finalFn: () => {
                called = true;
            },
        });

        expect(called).toBeTruthy();
    });

    it("checkResultReturn は例外時でも finalFn を呼ぶ", () => {
        let called = false;

        checkResultReturn({
            fn: () => {
                throw new Error("boom");
            },
            err: () => createErr("err"),
            finalFn: () => {
                called = true;
            },
        });

        expect(called).toBeTruthy();
    });

    it("checkResultVoid は成功時に UNIT を返す", () => {
        const res = checkResultVoid({
            fn: () => {},
            err: () => createErr("e"),
        });

        expect(isOk(res)).toBeTruthy();
        assert(isOk(res));

        expect(res.value).toBe(UNIT);
    });

    it("checkResultVoid は成功時でも finalFn を呼ぶ", () => {
        let called = false;

        checkResultVoid({
            fn: () => {},
            err: () => createErr("e"),
            finalFn: () => {
                called = true;
            },
        });

        expect(called).toBeTruthy();
    });

    it("checkResultVoid は例外時でも finalFn を呼ぶ", () => {
        let called = false;

        checkResultVoid({
            fn: () => {
                throw new Error("boom");
            },
            err: () => createErr("e"),
            finalFn: () => {
                called = true;
            },
        });

        expect(called).toBeTruthy();
    });

    it("checkPromiseReturn は解決時に ok を返す", async () => {
        const res = await checkPromiseReturn({
            fn: async () => "async",
            err: () => createErr("e"),
        });

        expect(isOk(res)).toBeTruthy();
        assert(isOk(res));

        expect(res.value).toBe("async");
    });

    it("checkPromiseReturn は拒否時に ng を返す", async () => {
        const res = await checkPromiseReturn({
            fn: async () => {
                throw new Error("fail");
            },
            err: () => createErr("err"),
        });

        expect(isErr(res)).toBeTruthy();
    });

    it("checkPromiseReturn は解決時でも finalFn を呼ぶ", async () => {
        let called = false;

        await checkPromiseReturn({
            fn: async () => "async",
            err: () => createErr("e"),
            finalFn: () => {
                called = true;
            },
        });

        expect(called).toBeTruthy();
    });

    it("checkPromiseReturn は拒否時でも finalFn を呼ぶ", async () => {
        let called = false;

        await checkPromiseReturn({
            fn: async () => {
                throw new Error("fail");
            },
            err: () => createErr("e"),
            finalFn: () => {
                called = true;
            },
        });

        expect(called).toBeTruthy();
    });

    it("checkPromiseVoid は成功時に UNIT を返す", async () => {
        const res = await checkPromiseVoid({
            fn: async () => {},
            err: () => createErr("e"),
        });

        expect(isOk(res)).toBeTruthy();
        assert(isOk(res));

        expect(res.value).toBe(UNIT);
    });

    it("checkPromiseVoid は成功時でも finalFn を呼ぶ", async () => {
        let called = false;

        await checkPromiseVoid({
            fn: async () => {},
            err: () => createErr("e"),
            finalFn: () => {
                called = true;
            },
        });

        expect(called).toBeTruthy();
    });

    it("checkPromiseVoid は拒否時でも finalFn を呼ぶ", async () => {
        let called = false;

        await checkPromiseVoid({
            fn: async () => {
                throw new Error("fail");
            },
            err: () => createErr("e"),
            finalFn: () => {
                called = true;
            },
        });

        expect(called).toBeTruthy();
    });
});
