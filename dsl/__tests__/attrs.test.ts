import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("attrs", () => {
  it("值支持布尔，字符串和数值以及数组", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element @config {
     vertical: true
     string: 'string'
     number: 100
     array: [true, 'string', 100, [true, 'string', 100]]
   }
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 2,
      "line": 8,
      "lineBreaks": 0,
      "offset": 150,
    },
    "nodes": [
      [
        "default",
        {
          "children": {
            "end": null,
            "nodes": [],
            "start": null,
          },
          "end": {
            "col": 5,
            "line": 7,
            "lineBreaks": 1,
            "offset": 148,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "scopes": [],
          "settings": [
            [
              "@config",
              [
                [
                  "vertical",
                  [],
                  true,
                ],
                [
                  "string",
                  [],
                  "string",
                ],
                [
                  "number",
                  [],
                  100,
                ],
                [
                  "array",
                  [],
                  [
                    true,
                    "string",
                    100,
                    [
                      true,
                      "string",
                      100,
                    ],
                  ],
                ],
              ],
            ],
          ],
          "start": {
            "col": 4,
            "line": 2,
            "lineBreaks": 0,
            "offset": 10,
          },
          "values": [],
        },
      ],
    ],
    "start": {
      "col": 6,
      "line": 1,
      "lineBreaks": 0,
      "offset": 5,
    },
  },
  "end": {
    "col": 2,
    "line": 8,
    "lineBreaks": 0,
    "offset": 150,
  },
  "id": null,
  "modifiers": [],
  "name": "Root",
  "scopes": [],
  "settings": [],
  "start": {
    "col": 1,
    "line": 1,
    "lineBreaks": 0,
    "offset": 0,
  },
  "values": [],
}
`);
  });

  it("属性修饰符", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element @config {
     vertical.modifierA.modifierB: true
     string.modifierA.modifierB: 'string'
     number.modifierA.modifierB: 100
     array.modifierA.modifierB: [true, 'string', 100, [true, 'string', 100]]
   }
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 2,
      "line": 8,
      "lineBreaks": 0,
      "offset": 230,
    },
    "nodes": [
      [
        "default",
        {
          "children": {
            "end": null,
            "nodes": [],
            "start": null,
          },
          "end": {
            "col": 5,
            "line": 7,
            "lineBreaks": 1,
            "offset": 228,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "scopes": [],
          "settings": [
            [
              "@config",
              [
                [
                  "vertical",
                  [
                    "modifierA",
                    "modifierB",
                  ],
                  true,
                ],
                [
                  "string",
                  [
                    "modifierA",
                    "modifierB",
                  ],
                  "string",
                ],
                [
                  "number",
                  [
                    "modifierA",
                    "modifierB",
                  ],
                  100,
                ],
                [
                  "array",
                  [
                    "modifierA",
                    "modifierB",
                  ],
                  [
                    true,
                    "string",
                    100,
                    [
                      true,
                      "string",
                      100,
                    ],
                  ],
                ],
              ],
            ],
          ],
          "start": {
            "col": 4,
            "line": 2,
            "lineBreaks": 0,
            "offset": 10,
          },
          "values": [],
        },
      ],
    ],
    "start": {
      "col": 6,
      "line": 1,
      "lineBreaks": 0,
      "offset": 5,
    },
  },
  "end": {
    "col": 2,
    "line": 8,
    "lineBreaks": 0,
    "offset": 230,
  },
  "id": null,
  "modifiers": [],
  "name": "Root",
  "scopes": [],
  "settings": [],
  "start": {
    "col": 1,
    "line": 1,
    "lineBreaks": 0,
    "offset": 0,
  },
  "values": [],
}
`);
  });

  it("嵌套属性", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
   Element @config {
     vertical.modifierA.modifierB: true
     string.modifierA.modifierB: 'string'
     number.modifierA.modifierB: 100
     array.modifierA.modifierB: [true, 'string', 100, [true, 'string', 100]]
     nested.modifierA.modifierB: {
        vertical.modifierA.modifierB: true
        string.modifierA.modifierB: 'string'
        number.modifierA.modifierB: 100
        array.modifierA.modifierB: [true, 'string', 100, [true, 'string', 100]]
        nested.modifierA.modifierB: {
            vertical.modifierA.modifierB: true
            string.modifierA.modifierB: 'string'
            number.modifierA.modifierB: 100
            array.modifierA.modifierB: [true, 'string', 100, [true, 'string', 100]]
        }
     }
   }
 }
`;

    parser.feed(input);
    expect(parser.results[0]).toMatchInlineSnapshot(`
{
  "children": {
    "end": {
      "col": 2,
      "line": 20,
      "lineBreaks": 0,
      "offset": 752,
    },
    "nodes": [
      [
        "default",
        {
          "children": {
            "end": null,
            "nodes": [],
            "start": null,
          },
          "end": {
            "col": 5,
            "line": 19,
            "lineBreaks": 1,
            "offset": 750,
          },
          "id": null,
          "modifiers": [],
          "name": "Element",
          "scopes": [],
          "settings": [
            [
              "@config",
              [
                [
                  "vertical",
                  [
                    "modifierA",
                    "modifierB",
                  ],
                  true,
                ],
                [
                  "string",
                  [
                    "modifierA",
                    "modifierB",
                  ],
                  "string",
                ],
                [
                  "number",
                  [
                    "modifierA",
                    "modifierB",
                  ],
                  100,
                ],
                [
                  "array",
                  [
                    "modifierA",
                    "modifierB",
                  ],
                  [
                    true,
                    "string",
                    100,
                    [
                      true,
                      "string",
                      100,
                    ],
                  ],
                ],
                [
                  "nested",
                  [
                    "modifierA",
                    "modifierB",
                  ],
                  [
                    [
                      "vertical",
                      [
                        "modifierA",
                        "modifierB",
                      ],
                      true,
                    ],
                    [
                      "string",
                      [
                        "modifierA",
                        "modifierB",
                      ],
                      "string",
                    ],
                    [
                      "number",
                      [
                        "modifierA",
                        "modifierB",
                      ],
                      100,
                    ],
                    [
                      "array",
                      [
                        "modifierA",
                        "modifierB",
                      ],
                      [
                        true,
                        "string",
                        100,
                        [
                          true,
                          "string",
                          100,
                        ],
                      ],
                    ],
                    [
                      "nested",
                      [
                        "modifierA",
                        "modifierB",
                      ],
                      [
                        [
                          "vertical",
                          [
                            "modifierA",
                            "modifierB",
                          ],
                          true,
                        ],
                        [
                          "string",
                          [
                            "modifierA",
                            "modifierB",
                          ],
                          "string",
                        ],
                        [
                          "number",
                          [
                            "modifierA",
                            "modifierB",
                          ],
                          100,
                        ],
                        [
                          "array",
                          [
                            "modifierA",
                            "modifierB",
                          ],
                          [
                            true,
                            "string",
                            100,
                            [
                              true,
                              "string",
                              100,
                            ],
                          ],
                        ],
                      ],
                    ],
                  ],
                ],
              ],
            ],
          ],
          "start": {
            "col": 4,
            "line": 2,
            "lineBreaks": 0,
            "offset": 10,
          },
          "values": [],
        },
      ],
    ],
    "start": {
      "col": 6,
      "line": 1,
      "lineBreaks": 0,
      "offset": 5,
    },
  },
  "end": {
    "col": 2,
    "line": 20,
    "lineBreaks": 0,
    "offset": 752,
  },
  "id": null,
  "modifiers": [],
  "name": "Root",
  "scopes": [],
  "settings": [],
  "start": {
    "col": 1,
    "line": 1,
    "lineBreaks": 0,
    "offset": 0,
  },
  "values": [],
}
`);
  });
});
