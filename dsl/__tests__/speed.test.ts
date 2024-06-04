import nearley from "nearley";
import grammar from "../lib/dsl.js";

describe("速度测试", () => {
  it("基础", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
      Section {
        Heading "Welcome to the Advanced Page"
        Paragraph "This is an advanced example of a page created using our custom DSL."
        Image "advanced_welcome.jpg" {
          Section {
            Heading "Welcome to the Advanced Page"
            Paragraph "This is an advanced example of a page created using our custom DSL."
            Image "advanced_welcome.jpg" {
              Section {
                Heading "Welcome to the Advanced Page"
                Paragraph "This is an advanced example of a page created using our custom DSL."
                Image "advanced_welcome.jpg" {
                  Section {
                    Heading "Welcome to the Advanced Page"
                    Paragraph "This is an advanced example of a page created using our custom DSL."
                    Image "advanced_welcome.jpg" {
                      Section {
                        Heading "Welcome to the Advanced Page"
                        Paragraph "This is an advanced example of a page created using our custom DSL."
                        Image "advanced_welcome.jpg" {
                          Section {
                            Heading "Welcome to the Advanced Page"
                            Paragraph "This is an advanced example of a page created using our custom DSL."
                            Image "advanced_welcome.jpg" {}
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
}
`;

    parser.feed(input);
    expect(parser.results.length).toMatchInlineSnapshot(`1`);
  });
});
