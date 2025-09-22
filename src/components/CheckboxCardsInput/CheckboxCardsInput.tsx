'use client';

import { CheckboxCards, Flex, Text } from '@radix-ui/themes';
import type { CheckboxCardsInputProps } from './CheckboxCardsInput.types';
import { isValueArrayOfStringable, toArray, toString, type Stringable } from '@emperorrag/utilities';

export default function CheckboxCardsInput({ input: { name, key, defaultValue, options, columns } }: CheckboxCardsInputProps) {
	return (
		<CheckboxCards.Root
			key={key}
			defaultValue={
				defaultValue
					? isValueArrayOfStringable(defaultValue)
						? toString(defaultValue)
						: toString(toArray(defaultValue) satisfies Stringable[])
					: undefined
			}
			name={name}
			columns={toString(columns)}
		>
			{options.map(({ label, description, value }) => (
				<CheckboxCards.Item key={toString(value)} value={toString(value)}>
					<Flex direction={'column'}>
						<Text>{label}</Text>
						<Text>{description}</Text>
					</Flex>
				</CheckboxCards.Item>
			))}
		</CheckboxCards.Root>
	);
}
