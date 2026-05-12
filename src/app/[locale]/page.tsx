import SectionTitle from '@/components/shared/SectionTitle';
import { DoubleArrowRightIcon } from '@radix-ui/react-icons';
import {
	Database,
	GitBranch,
	SquareTerminal,
	Palette,
	Layers2,
	Code,
	Award,
	Rocket
} from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import BigButton from '@/components/shared/BigButton';

export default function HomePage() {
	const tHomePage = useTranslations('HomePage');
	const tGloabal = useTranslations('Global');

	const renderSkillItems = () => {
		const techArsenal = [
			{ ico: SquareTerminal, name: 'Next.js', desc: 'Framework' },
			{ ico: Code, name: 'TypeScript', desc: 'Language' },
			{ ico: Layers2, name: 'React', desc: 'Library' },
			{ ico: Palette, name: 'Tailwind', desc: 'Styling' },
			{ ico: GitBranch, name: 'Git', desc: 'Versioning' },
			{ ico: Database, name: 'Sql', desc: 'Database' }
		];

		return techArsenal.map((item) => {
			const Icon = item.ico;

			return (
				<div key={item.name} className="dap-skill-item group p-8 transition-colors duration-300">
					<div className="mb-4" style={{ color: 'var(--primary-color)' }}>
						<Icon size={20} />
					</div>
					<p className="font-headline font-bold tracking-tighter text-lg">{item.name}</p>
					<p
						className="text-[10px] uppercase tracking-widest"
						style={{ color: 'var(--secondary-text-color)' }}
					>
						{item.desc}
					</p>
				</div>
			);
		});
	};

	const renderOtherInfoItems = () => {
		const otherInformations = [
			{ ico: Award, text: '3+', desc: tHomePage('otherInfo-experience-desc') },
			{ ico: Rocket, text: '4+', desc: tHomePage('otherInfo-projects-desc') }
		];

		return otherInformations.map((item) => {
			const Icon = item.ico;

			return (
				<div
					key={item.text}
					className="p-8 rounded-lg flex flex-col justify-between min-h-160px"
					style={{ background: 'var(--secondary-color)' }}
				>
					<div className="mb-4">
						<Icon />
					</div>
					<div>
						<p className="text-3xl font-headline font-extrabold">{item.text}</p>
						<p
							className="text-[10px] uppercase tracking-widest"
							style={{ color: 'var(--secondary-text-color)' }}
						>
							{item.desc}
						</p>
					</div>
				</div>
			);
		});
	};

	return (
		<div className="grid grid-cols-1 gap-20 items-start lg:grid-cols-12">
			{/* Left Column: img */}
			<div className="lg:col-span-5 lg:sticky lg:top-32">
				<div className="relative group">
					<div className="relative aspect-4/5 overflow-hidden rounded-lg">
						<Image src="/profile_photo.webp" alt="Profile photo" fill className="object-cover" />
					</div>
				</div>
				<div className="mt-8">
					<span
						className="font-label text-[10px] uppercase tracking-[0.3em] mb-2 block"
						style={{ color: 'var(--primary-color)' }}
					>
						{tHomePage('currentLocation-title')}
					</span>
					<p className="font-headline text-xl font-bold tracking-tighter">
						{tHomePage('currentLocation')}
					</p>
				</div>
			</div>

			{/* Right Column: Bio & Skills */}
			<div className="lg:col-span-7 space-y-24">
				{/* Bio */}
				<section>
					<SectionTitle
						eyebrow={tHomePage('introduction-section-title')}
						title='Front-end'
						titleHighlight='developer'
						subtitle={tHomePage('introduction-text')}
						caption={tHomePage('introduction-sub-text')}
					/>
					<div className="flex justify-end">
						<BigButton
							asLink
							link='/contact'
							text={tGloabal('contact-btn')}
							ico={<DoubleArrowRightIcon />}
							outline
						/>
					</div>
				</section>

				{/* Skills */}
				<section>
					<div className="mb-12 uppercase">
						<span
							className="font-label text-[10px] uppercase tracking-[0.3em] mb-4 block"
							style={{ color: 'var(--secondary-text-color)' }}
						>
							{tHomePage('techInfo-section-title')}
						</span>
						<h2 className="font-headline text-3xl font-bold tracking-tighter">
							{tHomePage('techInfo-title')}
						</h2>
					</div>

					{/* Skill Items */}
					<div className="dap-skills-container grid grid-cols-2 sm:grid-cols-3 gap-px rounded overflow-hidden">
						{renderSkillItems()}
					</div>
				</section>

				{/* Experience */}
				<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{renderOtherInfoItems()}
				</section>
			</div>
		</div>
	);
}
