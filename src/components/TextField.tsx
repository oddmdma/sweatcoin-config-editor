import {Flex, Text, TextField as RadixTextField} from "@radix-ui/themes";
import {ChangeEvent} from "react";

type TextFieldProps = {
	label: string;
	type: 'number' | 'search' | 'time' | 'text' | 'hidden' | 'tel' | 'url' | 'email' | 'date' | 'datetime-local' | 'month' | 'password' | 'week';
	name: string;
	value: string | number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const TextField = ({label, type, name, value, onChange}: TextFieldProps) => (
	<Flex gap="1" direction="column" mb="5" width="220px">
		<Text size="2">{label}</Text>
		<RadixTextField.Root type={type} name={name} value={value} onChange={onChange}>
			<RadixTextField.Slot/>
		</RadixTextField.Root>
	</Flex>
);
