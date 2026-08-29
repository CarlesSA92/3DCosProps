# Language Consistency Rule for Documents

## Rule
When writing or editing any Markdown document (`.md`) or any other text document, always use the same language the document is already written in.

## Guidelines
1. **Existing documents**: Detect the predominant language of the document and write/edit all content in that language. Do not mix languages.
2. **New documents**: If creating a brand new document and you are unsure which language to use, ask the user before writing any content.
3. **Code comments and technical identifiers**: Code blocks, variable names, function names, file paths, and CLI commands are exempt from this rule — they must stay in their original form.
4. **Inline references**: When referencing content that exists in another language (e.g., mentioning Spanish text in an English document), keep the reference in the document's own language. For example, in an English document write: `"Service card titles for Spanish (Planos, Diseñamos, Imprimimos, Acabado, Pieza)"` — the surrounding text stays in English.
5. **Bilingual/multilingual projects**: In projects that intentionally support multiple languages (e.g., i18n), this rule applies to the documentation and planning files — not to the actual locale-specific content files.

## Enforcement
- Before editing any document, check its existing language.
- If a document has mixed languages, normalize it to the predominant language.
- When in doubt, ask the user.