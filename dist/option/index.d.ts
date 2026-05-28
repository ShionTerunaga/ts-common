declare const basic: {
	readonly OPTION_SOME: "some";
	readonly OPTION_NONE: "none";
};
export interface Some<T> {
	readonly kind: typeof basic.OPTION_SOME;
	readonly value: T;
}
export interface None {
	readonly kind: typeof basic.OPTION_NONE;
}
type Option$1<T> = Some<NonNullable<T>> | None;
export declare function createSome<T>(value: NonNullable<T>): Option$1<T>;
export declare function createNone<T>(): Option$1<NonNullable<T>>;
export declare function isSome<T>(option: Option$1<NonNullable<T>>): option is Some<NonNullable<T>>;
export declare function isNone<T>(option: Option$1<T>): option is None;
export declare function optionConversion<T>(value: T): Option$1<T>;

export {
	Option$1 as Option,
};

export {};
