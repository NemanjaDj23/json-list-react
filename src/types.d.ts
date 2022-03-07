declare type FieldValue = string | number | boolean | JSONItem;

declare type JSONItem = Record<string, FieldValue> & { id?: string };
