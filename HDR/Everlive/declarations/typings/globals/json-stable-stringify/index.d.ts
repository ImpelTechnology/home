// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/7de6c3dd94feaeb21f20054b9f30d5dabc5efabd/json-stable-stringify/json-stable-stringify.d.ts
declare module 'json-stable-stringify' {

  function stringify(obj: any, opts?: stringify.Comparator | stringify.Options): string;

  namespace stringify {

    interface Element {
      key: string;
      value: any;
    }

    interface Comparator {
      (a: Element, b: Element): number;
    }

    interface Replacer {
      (key: string, value: any): any;
    }

    interface Options {
      cmp?: Comparator;
      space?: number | string;
      replacer?: Replacer;
    }
  }

  export = stringify;
}
