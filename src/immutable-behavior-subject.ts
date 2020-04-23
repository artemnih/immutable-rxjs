import { Subject, Subscriber, Subscription, SubscriptionLike, ObjectUnsubscribedError } from 'rxjs';
import { fromJS, Record } from 'immutable';

/**
 * A variant of Subject that requires an initial value and emits its current
 * value whenever it is subscribed to.
 * All values are immutable
 * @class ImmutableBehaviorSubject<T>
 */
export class ImmutableBehaviorSubject<T> extends Subject<T> {
    private _value?: Record<T> | T;
    private _type?: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
    
    constructor(value: T) {
        super();
        this.writeValue(value);
    }

    private readValue() {
        if (this._type && this._type === 'object' && this._value) {
            return (this._value as Record<T>).toJS();
        } else {
            return this._value as T;
        }
    }

    private writeValue(value: T) {
        this._type = typeof value;
        if (this._type === 'object' && value) {
            this._value = fromJS(value);
        } else {
            this._value = value;
        }
    }

    get value(): T {
        return this.getValue();
    }

    /** @deprecated This is an internal implementation detail, do not use. */
    _subscribe(subscriber: Subscriber<T>): Subscription {
        const subscription = super._subscribe(subscriber);
        if (subscription && !(<SubscriptionLike>subscription).closed) {
            subscriber.next(this.readValue());
        }
        return subscription;
    }

    getValue(): T {
        if (this.hasError) {
            throw this.thrownError;
        } else if (this.closed) {
            throw new ObjectUnsubscribedError();
        } else {
            return this.readValue();
        }
    }

    next(value: T): void {
        this.writeValue(value)
        super.next(this._value as any);
    }
}
