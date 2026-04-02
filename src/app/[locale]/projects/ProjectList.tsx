'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
type ProjectBadge = {
	text: string;
	variant?: BadgeVariant;
};
type Project = {
	title: string;
	desc: string[];
	badges: ProjectBadge[];
	img?: string;
};

const MOBILE_DESC_LIMIT = 220;
const DESKTOP_CARD_MIN_HEIGHT = 'md:min-h-[520px]';
const DESKTOP_DESC_MAX_HEIGHT = 'md:h-[260px]';

function useIsMobile(breakpoint = 768) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

		const handleChange = () => {
			setIsMobile(mediaQuery.matches);
		};

		handleChange();
		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, [breakpoint]);

	return isMobile;
}

export default function ProjectList() {
	const tGlobal = useTranslations('Global');
	const tProjects = useTranslations('ProjectsPage');
	const isMobile = useIsMobile();
	const [expandedProject, setExpandedProject] = useState<Record<string, boolean>>({});

	const projects: Project[] = useMemo(
		() => [
			{
				title: 'Grant Portal JMK',
				desc: [
					tProjects('project-jmk-desc1'),
					tProjects('project-jmk-desc2'),
					tProjects('project-jmk-desc3'),
					tProjects('project-jmk-desc4')
				],
				badges: [
					{ text: 'NextJS' },
					{ text: 'TypeScript' },
					{ text: 'React' },
					{ text: 'Tailwind' },
					{ text: 'CSS' },
					{ text: 'OpenAPI' }
				],
				img: '/ders_logo.webp'
			},
			{
				title: 'Redesign of the e-commerce module',
				desc: [
					tProjects('project-eoc-desc1'),
					tProjects('project-eoc-desc2'),
					tProjects('project-eoc-desc3'),
					tProjects('project-eoc-desc4')
				],
				badges: [{ text: 'JavaScript' }, { text: 'React' }, { text: 'CSS' }],
				img: '/ders_logo.webp'
			},
			{
				title: 'Drive4Life',
				desc: [
					tProjects('project-d4l-desc1'),
					tProjects('project-d4l-desc2'),
					tProjects('project-d4l-desc3'),
					tProjects('project-d4l-desc4')
				],
				badges: [
					{ text: tProjects('in-development'), variant: 'destructive' },
					{ text: 'NextJS' },
					{ text: 'TypeScript' },
					{ text: 'React' },
					{ text: 'CSS' }
				],
				img: '/d4l_logo.webp'
			},
			{
				title: 'HR-Studio',
				desc: [
					tProjects('project-hrs-desc1'),
					tProjects('project-hrs-desc2'),
					tProjects('project-hrs-desc3'),
					tProjects('project-hrs-desc4')
				],
				badges: [{ text: 'PHP' }, { text: 'JavaScript' }, { text: 'CSS' }, { text: 'SQL' }],
				img: '/HRStudio_web_preview.webp'
			}
		],
		[tProjects]
	);

	const toggleExpanded = (projectTitle: string) => {
		setExpandedProject((prev) => ({
			...prev,
			[projectTitle]: !prev[projectTitle]
		}));
	};

	const renderDescription = (project: Project) => {
		const fullText = project.desc.join(' ');
		const isExpanded = expandedProject[project.title] ?? false;
		const shouldTruncateOnMobile = isMobile && fullText.length > MOBILE_DESC_LIMIT;

		if (shouldTruncateOnMobile && !isExpanded) {
			const truncatedText = `${fullText.slice(0, MOBILE_DESC_LIMIT).trim()}...`;

			return (
				<div>
					<p>{truncatedText}</p>

					<Button
						type="button"
						variant="ghost"
						className="mt-3 px-0"
						onClick={() => toggleExpanded(project.title)}
					>
						{tGlobal('showMore-btn')} <ChevronDownIcon />
					</Button>
				</div>
			);
		}

		return (
			<div>
				{isMobile ? (
					<div>
						{project.desc.map((paragraph, index) => (
							<p key={`${project.title}-${index}`} className="py-2">
								{paragraph}
							</p>
						))}
					</div>
				) : (
					<ScrollArea className={`${DESKTOP_DESC_MAX_HEIGHT} pr-2`}>
						<div>
							{project.desc.map((paragraph, index) => (
								<p key={`${project.title}-${index}`} className="py-2">
									{paragraph}
								</p>
							))}
						</div>
					</ScrollArea>
				)}

				{shouldTruncateOnMobile && isExpanded && (
					<Button
						type="button"
						variant="ghost"
						className="mt-3 px-0"
						onClick={() => toggleExpanded(project.title)}
					>
						{tGlobal('showLess-btn')} <ChevronUpIcon />
					</Button>
				)}
			</div>
		);
	};

	return projects.map((project, index) => {
		const isReversed = index % 2 === 1;

		return (
			<Card
				key={project.title}
				className={`dap-porojectCard relative w-full overflow-hidden pt-0 ${DESKTOP_CARD_MIN_HEIGHT}`}
			>
				<div
					className={`flex h-full flex-col-reverse ${
						isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
					}`}
				>
					{/* TEXT */}
					<div
						className={`dap-porojectCard-header-wrapper flex flex-col justify-between md:w-1/2 ${DESKTOP_CARD_MIN_HEIGHT}`}
					>
						<CardHeader className="flex-1">
							<CardTitle className="pt-5 text-2xl">{project.title}</CardTitle>

							<CardDescription className="card-description pt-5 pb-5">
								{renderDescription(project)}
							</CardDescription>
						</CardHeader>

						<CardFooter className="card-footer flex flex-wrap gap-2">
							{project.badges.map((badge) => (
								<Badge key={badge.text} variant={badge.variant ?? 'outline'}>
									{badge.text}
								</Badge>
							))}
						</CardFooter>
					</div>

					{/* IMAGE */}
					<div className={`relative h-64 md:h-auto md:w-1/2 ${DESKTOP_CARD_MIN_HEIGHT}`}>
						<div className="absolute inset-0 z-20 bg-black/75" />

						<Image
							src={project.img ?? ''}
							alt={`${project.title} cover`}
							fill
							className="z-30 object-contain"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</div>
				</div>
			</Card>
		);
	});
}
