import {ChangeEvent} from "react";
import {Checkbox as RadixCheckbox, Flex, Text} from "@radix-ui/themes";

type CheckboxProps = {
	label: string;
	name: string;
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({label, name, checked, onChange}: CheckboxProps) => (
	<Flex gap="1" direction="column" mb="5">
		<Text as="label" size="2">
			<Flex gap="2">
				<RadixCheckbox
					name={name}
					checked={checked}
					onCheckedChange={(checked) => onChange({
						target: {
							name,
							type: 'checkbox',
							checked,
							value: checked ? 'true' : 'false'
						}
					} as ChangeEvent<HTMLInputElement>)}
				/>
				{label}
			</Flex>
		</Text>
	</Flex>
);
