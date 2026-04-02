import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const sectionTileAlignVariants = cva('sectionTitle', {
	variants: {
		align: {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right'
		},
		defaultVariants: {
			align: 'left'
		}
	}
});
type SectionTitleProps = {
	eyebrow?: string;
	title: string;
    titleHighlight?: string;
	subtitle?: string;
	caption?: string;
	xl?: boolean;
} & VariantProps<typeof sectionTileAlignVariants>;

export default function SectionTitle({ eyebrow, title, titleHighlight, subtitle, caption, xl = false, align = 'left' }: SectionTitleProps) {
	return (
		<section className={cn(sectionTileAlignVariants({ align }))}>
			<div className="mb-8 uppercase">
				{eyebrow &&
					<span
						className="font-label text-[10px] uppercase tracking-[0.3em] mb-4 block"
						style={{ color: 'var(--secondary-text-color)' }}
					>
						{eyebrow}
					</span>
				}
				<h1 className={`font-headline ${xl ? 'text-7xl md:text-9xl' : 'text-5xl md:text-7xl'} font-extrabold tracking-tighter leading-tight`}>
					{title}
                    <br/><span style={{ color: 'var(--primary-color)' }}>{titleHighlight}</span>
				</h1>
			</div>
			{subtitle && <div className="space-y-6 max-w-2xl mb-6">
					<p className="text-on-surface text-lg leading-relaxed">
						{subtitle}
					</p>
					{caption && <p
						className="text-on-surface/60 text-base leading-relaxed"
						style={{ color: 'var(--secondary-text-color)' }}
					>
						{caption}
					</p>}
				</div>
			}
		</section>
	);
}
