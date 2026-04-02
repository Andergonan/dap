import BigButton from '@/components/shared/BigButton';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-24">
			<SectionTitle eyebrow="System error" title="404" xl align="center" />

			<section className="mt-6">
				<BigButton
					asLink
					text='Home'
					link='/'
					unLocal
				/>
			</section>
		</div>
	);
}
