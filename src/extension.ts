// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as keywords from './keywords/javascript.json';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.rosetta', () => {
    vscode.window.showInformationMessage('Translating');
  });

  vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
    console.log('document', document);
    console.log('path', path);
    console.log('keywords', keywords);
    vscode.window.showInformationMessage('Translating');
    const translatedFileText:string = translate(document);
    writeTranslatedFile(translatedFileText);
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function translate(document: vscode.TextDocument) {
  const fileText:string = document.getText();
  const tokens:Array<string> = tokenize(fileText);
  console.log(tokens);

  let translatedFileText:string = fileText;
  for (let token of tokens) {
    if (token in keywords) {
      translatedFileText = translatedFileText.replace(new RegExp(token, 'g'), keywords[token].zh);
    }
  }
  console.log(translatedFileText);
  return translatedFileText;
}

function tokenize(fileText: string): Array<string> {
  // match all unicode word characters
  const regexp = /([_a-zA-Z]|[\u007F-\uFFFF])+/g; // https://regex101.com/r/UCqQuR/3
  const words = fileText.match(regexp);
  const tokens = [...new Set(words)];
  return tokens;
}

function writeTranslatedFile(translateFileText:string) {

}

function saveTranslationMap() {

}
