import SectionTitle from '@/components/shared/SectionTitle';
import { getTranslations } from 'next-intl/server';
import ContactList from './contactList';

export default async function ContactPage() {
	const tContact = await getTranslations('ContactPage');

	return (
		<>
			<SectionTitle
				eyebrow={tContact('title-eyebrow')}
				title={tContact('title-line1')}
				titleHighlight={tContact('title-line2')}
				align="center"
			/>

			<section className="max-w-[900px] mx-auto px-6 md:px-24">
				<ContactList />
			</section>
		</>
	);
}
