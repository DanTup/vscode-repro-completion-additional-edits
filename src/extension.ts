// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	const pos = new vscode.Position(0, 0);
	const range = new vscode.Range(pos, pos);

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: "markdown" }, {
		provideCompletionItems: (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) => {
			// Build a string like `test(onPressed: [null])` where [null] is
			// a placeholder containing "null".

			const item = new vscode.CompletionItem("dantup");
			item.insertText = "dantup";
			item.additionalTextEdits = [
				new vscode.TextEdit(range, "additional-dantup"),
			];
			return [item];
		}
	}));

	const doc = await vscode.workspace.openTextDocument({ language: "markdown" });
	const results = await (vscode.commands.executeCommand("vscode.executeCompletionItemProvider", doc.uri, pos, undefined, 100000) as Thenable<vscode.CompletionList>);
	const result = results.items.find((c) => c.label === "dantup")!;
	console.warn(result.label);
	console.warn(result.additionalTextEdits);
}

// this method is called when your extension is deactivated
export function deactivate() { }
