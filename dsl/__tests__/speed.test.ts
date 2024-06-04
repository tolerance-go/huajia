import nearley from "nearley";
import grammar from "../lib/dsl.js";

describe("速度测试", () => {
  it("基础", () => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    const input = `Root {
        Page {
        Title "Advanced Page Example"
        Header {
          Logo "advanced_logo.png"
          Nav {
            Link "Home" "index.html"
            Link "Services" "services.html"
            SubNav "Products" {
              Link "Product A" "product_a.html"
              Link "Product B" "product_b.html"
              Link "Product C" "product_c.html"
            }
            Link "Contact" "contact.html"
          }
        }
        Main {
          Section {
            Heading "Welcome to the Advanced Page"
            Paragraph "This is an advanced example of a page created using our custom DSL."
            Image "advanced_welcome.jpg"
          }
        
        }
        Footer {
          Text "© 2024 Advanced Website"
          Links {
            Link "Privacy Policy" "privacy.html"
            Link "Terms of Service" "terms.html"
          }
        }
      }
      }
`;

    parser.feed(input);
    expect(parser.results.length).toMatchInlineSnapshot(`16384`);
  });
});
