import nearley from "nearley";
import grammar from "../lib/dsl.js";

describe("速度测试", () => {
  it("基础", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
        Main {
            Section {
              Heading "Welcome to the Advanced Page"
              Paragraph "This is an advanced example of a page created using our custom DSL."
              Image "advanced_welcome.jpg"
            }
            Section {
              Heading "Welcome to the Advanced Page"
              Paragraph "This is an advanced example of a page created using our custom DSL."
              Image "advanced_welcome.jpg" {
                Section {
                    Heading "Welcome to the Advanced Page"
                    Paragraph "This is an advanced example of a page created using our custom DSL."
                    Image "advanced_welcome.jpg"
                  }
                  Section {
                    Heading "Welcome to the Advanced Page"
                    Paragraph "This is an advanced example of a page created using our custom DSL."
                    Image "advanced_welcome.jpg"
                  }
                  Section {
                    Heading "Welcome to the Advanced Page"
                    Paragraph "This is an advanced example of a page created using our custom DSL."
                    Image "advanced_welcome.jpg"
                  }
              }
            }
            Section {
                Heading "Welcome to the Advanced Page"
                Paragraph "This is an advanced example of a page created using our custom DSL."
                Image "advanced_welcome.jpg"
              }
          }
      }
`;

    parser.feed(input);
    expect(parser.results.length).toMatchInlineSnapshot(`131072`);
  });
});
