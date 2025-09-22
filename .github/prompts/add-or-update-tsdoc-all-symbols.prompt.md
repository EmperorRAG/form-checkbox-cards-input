---
mode: 'edit'
description: 'Add or update TSDoc comments for all symbols (exported and internal) in the current file with detailed and useful documentation.'
---

For every symbol in the current file—including exported and non-exported functions, classes, types, interfaces, enums, and constants—add or update TSDoc comments to provide clear, detailed, and useful documentation.

**TSDoc standards and structure:**

- Every TSDoc block must begin with a concise summary sentence describing the symbol's purpose.
- For overloaded functions, provide a summary TSDoc for each overload signature and for the implementation signature (the one with the function body).
- For all signatures (including implementation signatures), always include a summary line at the start of the TSDoc block.
- Use detailed descriptions of all parameters (with `@param` tags), including types and expected values.
- Describe the return value (with `@returns`), including type and possible values.
- Add relevant usage notes, edge cases, or important behaviors.
- Include examples of usage (with `@example`), if helpful.
- Add any relevant `@remarks`, `@throws`, or `@deprecated` tags as appropriate.
- Follow TSDoc best practices for structure and clarity.

Use clear, professional language and do not remove or alter the code logic—only add or update documentation for all symbols, not just exported ones.
