import nearley from "nearley";
import grammar from "../lib/grammar.cjs";

describe("表达式", () => {
  it("分支表达式", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = ` Root {
      Element @interaction {
        click: IF age > 18 THEN adult('name', name) ELSE close()
      }
    }`;

    expect(() => parser.feed(input)).not.toThrow();
  });

  it("结果表达式", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = ` Root {
      Element @interaction {
        click: adult('name', name)
      }
    }`;

    expect(() => parser.feed(input)).not.toThrow();
  });

  it("嵌套分支语句", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = ` Root {
      Element @interaction {
        click: IF age > 18 THEN 
          IF age > 18 THEN adult('name', name) ELSE close()
        ELSE
          close()
      }
    }`;
    expect(() => parser.feed(input)).not.toThrow();
  });

  it("带逻辑操作的表达式", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = ` Root {
      Element @interaction {
        click: IF age > 18 AND hasID() THEN canEnter() ELSE cannotEnter()
      }
    }`;
    expect(() => parser.feed(input)).not.toThrow();
  });

  it("嵌套逻辑表达式", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = ` Root {
      Element @interaction {
        click: IF age > 18 AND (hasID() OR isVIP) THEN canEnter() ELSE cannotEnter()
        click2: IF age > 18 AND (hasID() OR isVIP) AND NOT small THEN canEnter() ELSE cannotEnter()
      }
    }`;
    expect(() => parser.feed(input)).not.toThrow();
  });

  it("使用 NOT 操作符", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = ` Root {
      Element @interaction {
        click: IF NOT isMember THEN applyMembership() ELSE welcomeBack()
      }
    }`;
    expect(() => parser.feed(input)).not.toThrow();
  });

  it("函数调用", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = ` Root {
      Element @interaction {
        click: IF isValidUser(user) THEN welcomeUser() ELSE invalidUser()
      }
    }`;
    expect(() => parser.feed(input)).not.toThrow();
  });
});
