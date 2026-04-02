import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/shared/SectionTitle';
import ProjectList from './ProjectList';

export default function ProjectsPage() {
	const tProjects = useTranslations('ProjectsPage');

	return (
		<>
			<SectionTitle
				eyebrow={tProjects('title-eyebrow')}
				title={tProjects('title-line1')}
				titleHighlight={tProjects('title-line2')}
			/>

			<section className="flex flex-col gap-8">
				<ProjectList />
			</section>
		</>
	);
}