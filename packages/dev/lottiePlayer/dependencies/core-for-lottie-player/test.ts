export class Foo {
    private _prop1: string;

    public method1(): void {
        console.log("method");
    }

    public get prop1(): string {
        return this._prop1;
    }

    public set prop1(value: string) {
        this._prop1 = value;
    }

    public static staticConstant: string = "constant";

    public static staticMethod(): void {
        console.log("staticMethod");
    }
}
