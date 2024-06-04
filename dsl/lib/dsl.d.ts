import { Lexer, Parser, Grammar } from "nearley";

export const lexer: Lexer;

export const ParserRules: Array<any>;

export const ParserStart: string;

export const grammar: Grammar;

export class DslParser extends Parser {
  constructor();
}
