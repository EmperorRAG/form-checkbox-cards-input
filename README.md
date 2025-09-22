# Form Checkbox Cards Input

A flexible, accessible, and themeable Checkbox Cards Input component for React forms, built with [Radix UI](https://www.radix-ui.com/themes/docs/components/checkbox-cards), TypeScript, and modern best practices.

> **Admonition**
> :rocket: **Production-ready, configuration-driven, and easy to integrate into any React or Next.js project.**

---

## Features

- **Multi-select**: Select one or more options using visually rich cards with checkboxes.
- **Accessible**: Built on Radix UI primitives for full keyboard and screen reader support.
- **Config-driven**: Define options, columns, and defaults via a single config object.
- **SSR Compatible**: Works seamlessly with Next.js and server-side rendering.
- **Customizable**: Style via props or CSS classes; supports custom layouts.
- **Type-safe**: Written in TypeScript with full type definitions.
- **Tested**: Includes unit, integration, and E2E tests with high coverage.

---

## Installation

```sh
npm install @emperorrag/form-checkbox-cards-input
```

> **Admonition**
> :information_source: Requires React 18+ and [Radix UI Themes](https://www.radix-ui.com/themes/docs/components/checkbox-cards).

---

## Quick Start

```tsx
import { CheckboxCardsInput } from '@emperorrag/form-checkbox-cards-input';

const config = {
	name: 'fruits',
	columns: 2,
	options: [
		{ label: 'Apple', description: 'A sweet fruit', value: 'apple' },
		{ label: 'Banana', description: 'A yellow fruit', value: 'banana' },
	],
};

<CheckboxCardsInput input={config} />;
```

---

## Usage

### Basic Example

```tsx
<CheckboxCardsInput
	input={{
		name: 'colors',
		columns: 3,
		options: [
			{ label: 'Red', description: 'The color red', value: 'red' },
			{ label: 'Green', description: 'The color green', value: 'green' },
			{ label: 'Blue', description: 'The color blue', value: 'blue' },
		],
	}}
/>
```

### With Custom Styles

```tsx
<CheckboxCardsInput input={config} styles={{ styles: 'my-custom-checkbox-card' }} />
```

### In a Form

```tsx
<form>
	<CheckboxCardsInput input={config} />
	<button type="submit">Submit</button>
</form>
```

---

## Props & Types

```ts
interface CheckboxCardsInputConfig {
	name: string;
	key?: string;
	defaultValue?: Stringable | Stringable[];
	options: CheckboxCardsInputOption[];
	columns: number;
}

interface CheckboxCardsInputOption {
	label: string;
	description: string;
	value: Stringable;
}

interface CheckboxCardsInputStyles {
	styles: string;
}

interface CheckboxCardsInputProps {
	input: CheckboxCardsInputConfig;
	styles?: CheckboxCardsInputStyles;
}
```

---

## Accessibility & Theming

- Uses Radix UI's accessibility primitives for keyboard and screen reader support.
- Fully themeable via Radix UI Themes and custom CSS classes.
- Follows [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/) guidelines.

---

## Development & Testing

- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Test:** `npm run test`
- **Storybook:** `npm run storybook`

---

## Project Structure

```text
src/
  form-checkbox-cards-input.tsx
  components/
    CheckboxCardsInput/
      CheckboxCardsInput.tsx
      CheckboxCardsInput.types.ts
  globals.css
spec/
  spec-design-checkbox-cards-input.md
```

---

## Resources

- [Radix UI Themes Documentation](https://www.radix-ui.com/themes/docs/components/checkbox-cards)
- [Project Specification](./spec/spec-design-checkbox-cards-input.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

> **Admonition**
> :bulb: For advanced usage, see the [specification](./spec/spec-design-checkbox-cards-input.md) and explore the source code for more configuration options.
