import { Subject, Observable } from "rxjs";

export class Property<T = any>{
    constructor(value?: T) {
        this._value = value;
        this._subject = new Subject<T>();
        this._observable = this._subject.asObservable();
    }
    private _subject: Subject<T>;
    private _observable: Observable<T>;
    private _value?: T;
    public get value() { return this._value; }

    public set value(value: T) {
        this._value = value;
        this._subject.next(this._value);
    }

    public asObservable(): Observable<T> {
        return this._observable;
    }
}
