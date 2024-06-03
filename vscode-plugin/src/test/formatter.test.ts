import * as assert from "assert";
import * as vscode from "vscode";
import { DSLFormatter } from "../dslFormatter";

suite("DSL Formatter Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

//   test("Format DSL code compactText", async () => {
//     const initialText = `Admin {
//   Title "Admin Interface"
  
//   Page "Dashboard" {
//         Title "Dashboard"
//      Header {
//       Logo "admin_logo.png" {  alt: "Company Logo", width: "100px" }
//     }
//   }
// }`;

//     const expectedFormattedText = `Admin{Title"AdminInterface"Page"Dashboard"{Title"Dashboard"Header{Logo"admin_logo.png"{alt:"CompanyLogo",width:"100px"}}}}`;

//     const dslFormatter = new DSLFormatter();
//     const formattedText = dslFormatter.compactText(initialText);

//     assert.strictEqual(formattedText, expectedFormattedText);
//   });

//   test("Format DSL code formatWithIndentation", async () => {
//     const initialText = `Admin{Title"AdminInterface"}`;

//     const expectedFormattedText = `Admin {
//   Title "AdminInterface"
// }`;

//     const dslFormatter = new DSLFormatter();
//     const formattedText = dslFormatter.formatWithIndentation(initialText);

//     assert.strictEqual(formattedText, expectedFormattedText);
//   });
});
