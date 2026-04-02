import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Link as LocaleLink } from '@/i18n/navigations';

type BaseProps = {
	text?: string;
	ico?: ReactNode;
	outline?: boolean;
	unLocal?: boolean;
	disabled?: boolean; 
};
type AsLinkProps = BaseProps & {
	asLink: true;
	link: string;
	onClick?: never;
	type?: never;
};
type AsButtonProps = BaseProps & {
	asLink?: false;
	onClick?: () => void;
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
	link?: never;
};
type BigNavButtonProps = AsLinkProps | AsButtonProps;

export default function BigButton(props: BigNavButtonProps) {
	const { text, ico, outline = false, unLocal = false, disabled = false } = props;

	const className = `bigButton ${outline ? 'outline' : ''} text-[12px] md:text-[14px]`;

	// LINK
	if (props.asLink) {
		const LinkComponent = unLocal ? Link : LocaleLink;

		return (
			<Button asChild className={className} disabled={disabled}>
				<LinkComponent href={props.link}>
					{text} {ico}
				</LinkComponent>
			</Button>
		);
	}

	// BUTTON
	return (
		<Button className={className} type={props.type} onClick={props.onClick}>
			{text} {ico}
		</Button>
	);
}
