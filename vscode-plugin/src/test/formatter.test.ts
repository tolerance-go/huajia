import * as assert from "assert";
import * as vscode from "vscode";
import { DSLFormatter } from "../dslFormatter";

suite("DSL Formatter Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Format DSL code", async () => {
    const initialText = `Admin {
  Title "Admin Interface"
  
  Page "Dashboard" {
        Title "Dashboard"
     Header {
      Logo "admin_logo.png" {  alt: "Company Logo", width: "100px" }
      Nav {
        Link "Dashboard" "dashboard.html" { 
          alt: "Company Logo", width: "100px" }
        Link "Users" "users.html"
        Link "Settings" "settings.html"
        Link "Logout" "logout.html"
      }
    }
  }
}`;

    const expectedFormattedText = `Admin {
  Title "Admin Interface"
  
  Page "Dashboard" {
    Title "Dashboard"
    Header {
      Logo "admin_logo.png" { alt: "Company Logo", width: "100px" }
      Nav {
        Link "Dashboard" "dashboard.html" { 
          alt: "Company Logo", 
          width: "100px"
        }
        Link "Users" "users.html"
        Link "Settings" "settings.html"
        Link "Logout" "logout.html"
      }
    }
  }
}`;

    const dslFormatter = new DSLFormatter();
    const formattedText = dslFormatter["formatText"](initialText);

    assert.strictEqual(formattedText, expectedFormattedText);
  });
});
