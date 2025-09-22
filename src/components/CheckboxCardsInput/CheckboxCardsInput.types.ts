/**
 * Types and utility functions for the CheckboxCardsInput component.
 *
 * @packageDocumentation
 */

import type { Stringable } from '@emperorrag/utilities';

/**
 * Represents the configuration for a single CheckboxCardsInput field.
 *
 * @remarks
 * This configuration object defines the core properties required to render a CheckboxCardsInput field,
 * including its name, key, default value(s), available options, and layout columns.
 *
 * @property name - The unique name of the input field.
 * @property key - An optional unique key for the field, useful for React lists.
 * @property defaultValue - The default selected value(s) for the field. Can be a single value or an array of values.
 * @property options - The list of selectable options for the field.
 * @property columns - The number of columns to display the options in.
 *
 * @example
 * ```ts
 * const config: CheckboxCardsInputConfig = {
 *   name: 'fruits',
 *   columns: 2,
 *   options: [
 *     { label: 'Apple', description: 'A sweet fruit', value: 'apple' },
 *     { label: 'Banana', description: 'A yellow fruit', value: 'banana' }
 *   ]
 * };
 * ```
 */
export interface CheckboxCardsInputConfig {
	name: string;
	key?: string;
	defaultValue?: Stringable | Stringable[];
	options: CheckboxCardsInputOption[];
	columns: number;
}

/**
 * Represents a selectable option for a CheckboxCardsInput field.
 *
 * @remarks
 * Each option consists of a label, a description, and a value.
 *
 * @property label - The display label for the option.
 * @property description - A short description of the option.
 * @property value - The value associated with the option.
 *
 * @example
 * ```ts
 * const option: CheckboxCardsInputOption = {
 *   label: 'Apple',
 *   description: 'A sweet fruit',
 *   value: 'apple'
 * };
 * ```
 */
export interface CheckboxCardsInputOption {
	label: string;
	description: string;
	value: Stringable;
}

/**
 * Defines validation rules for CheckboxCardsInput.
 *
 * @remarks
 * Use this interface to specify minimum and maximum selection constraints.
 * The `required` property is intentionally omitted and cannot be set.
 *
 * @property min - The minimum number of options that must be selected.
 * @property max - The maximum number of options that can be selected.
 * @property required - This property is never allowed.
 *
 * @example
 * ```ts
 * const validations: CheckboxCardsInputValidations = {
 *   min: 1,
 *   max: 3
 * };
 * ```
 */
export interface CheckboxCardsInputValidations {
	min?: number;
	max?: number;
	required?: never;
}

/**
 * Specifies custom styles for the CheckboxCardsInput component.
 *
 * @remarks
 * The styles property should contain a string of CSS class names or style definitions.
 *
 * @property styles - A string representing custom styles or class names.
 *
 * @example
 * ```ts
 * const styles: CheckboxCardsInputStyles = {
 *   styles: 'my-custom-checkbox-card'
 * };
 * ```
 */
export interface CheckboxCardsInputStyles {
	styles: string;
}

/**
 * Props for the CheckboxCardsInput component.
 *
 * @remarks
 * This interface defines the props accepted by the CheckboxCardsInput React component,
 * including the input configuration and optional custom styles.
 *
 * @property input - The configuration object for the CheckboxCardsInput field.
 * @property styles - Optional custom styles for the component.
 *
 * @example
 * ```tsx
 * <CheckboxCardsInput
 *   input={config}
 *   styles={{ styles: 'my-custom-style' }}
 * />
 * ```
 */
export interface CheckboxCardsInputProps {
	input: CheckboxCardsInputConfig;
	styles?: CheckboxCardsInputStyles;
}
