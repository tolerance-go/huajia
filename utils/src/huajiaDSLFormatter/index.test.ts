import { HuajiaDSLFormatter } from ".";

describe("DSL Formatter Test Suite", () => {
  test("Format DSL code compactText", async () => {
    const cases = [
      ["空子集", `Root { }`, `Root\n`],
      [
        "内部空子集",
        `Root { 
        Element {

        }
      }`,
        `Root {
  Element
}\n`,
      ],
      [
        "values 的字符串",
        `Root {
  Element 'string'
}`,
        `Root {
  Element "string"
}\n`,
      ],
      [
        "values 之间的空格",
        `Root {
  Element 'string'  true
}`,
        `Root {
  Element "string" true
}\n`,
      ],
      [
        "空的 settings",
        [
          `Root {
  Element @css { }
}`,
          `Root {
  Element @css {
    
  }
}`,
        ],
        `Root {
  Element @css {}
}\n`,
      ],

      [
        "插槽",
        `Root {
  slotA: Element
}`,
        `Root {
  slotA: Element
}\n`,
      ],
      [
        "修饰符",
        `Root {
  Element.scopeA.scopeB
}`,
        `Root {
  Element.scopeA.scopeB
}\n`,
      ],
      [
        "修饰符和插槽",
        `Root {
  slotA: Element.scopeA.scopeB
}`,
        `Root {
  slotA: Element.scopeA.scopeB
}\n`,
      ],
      [
        "id",
        `Root {
  slotA: Element#id.scopeA.scopeB
}`,
        `Root {
  slotA: Element#id.scopeA.scopeB
}\n`,
      ],
      [
        "域",
        `Root {
  scopeA.scopeB.Element
}`,
        `Root {
  scopeA.scopeB.Element
}\n`,
      ],
      [
        "settings",
        `Root {
  slotA: Element#id.scopeA.scopeB @css {
        color: 'red'
  }
}`,
        `Root {
  slotA: Element#id.scopeA.scopeB @css {
    color: "red"
  }
}\n`,
      ],
      [
        "settings 嵌套",
        `Root {
  slotA: Element#id.scopeA.scopeB @css {
    color: "red"
    nested: {
      color: "blue"
      nested: {
        color: "blue"
      }
    }
  }
}`,
        `Root {
  slotA: Element#id.scopeA.scopeB @css {
    color: "red"
    nested: {
      color: "blue"
      nested: {
        color: "blue"
      }
    }
  }
}\n`,
      ],
    ];

    const dslFormatter = new HuajiaDSLFormatter();

    cases.forEach(([_, initialText, expectedFormattedText]) => {
      if (Array.isArray(initialText)) {
        initialText.forEach((item) => {
          const formattedText = dslFormatter.formatText(item);
          expect(formattedText).toBe(expectedFormattedText);
        });
      } else {
        const formattedText = dslFormatter.formatText(initialText);
        expect(formattedText).toBe(expectedFormattedText);
      }
    });
  });
});
