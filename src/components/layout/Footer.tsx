import { contactLinks } from '@/config/contact-links';

export default function Footer() {

	return (
		<footer className="w-full py-20 border-t border-white/5 bg-[#0e0e0e] flex flex-col md:flex-row justify-between items-center px-24">
			<div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-8 md:mb-0">
				© 2026 David Anderle
			</div>
			<div className="flex gap-12">
				{contactLinks.map((item) => (
					<a
						key={item.text}
						className='text-[10px] uppercase tracking-[0.2em] text-gray-600 hover:text-[#00FFAB] duration-300 transition-opacity opacity-80 hover:opacity-100'
						href={item.link}
						target='_blank'
					>
						{item.text}
					</a>
				))}
			</div>
		</footer>
	);
}
