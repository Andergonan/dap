'use client';
import { flushSync } from 'react-dom';
import { useState } from 'react';
import { Link, usePathname } from '@/i18n/navigations';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { CaretDownIcon, Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const t = useTranslations('Global');
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();

	const closeMobileMenu = () => {
		flushSync(() => {
			setMobileMenuOpen(false);
		});
	};

	// renders
	const renderLogo = () => {
		return (
			<Link href="/" className="da-text-logo -m-1.5 p-1.5" onClick={closeMobileMenu}>
				<Image
					src="/da_logo.webp"
					alt="DA logo"
					width={32}
					height={32}
					className="h-8 w-auto"
					priority
				/>
			</Link>
		);
	};

	const renderNavBtns = () => {
		const navBtns = [
			{ label: t('toAbout'), link: '/' },
			{ label: t('toProjects'), link: '/projects' },
			{ label: t('toContact'), link: '/contact' }
		];

		return navBtns.map((btn) => (
			<Link
				key={btn.link}
				href={btn.link}
				className={`dap-nav-link ${pathname === btn.link ? 'active' : ''}`}
				onClick={closeMobileMenu}
			>
				{btn.label}
			</Link>
		));
	};

	const renderLangSelect = () => {
		const languages = [{ code: 'cs' }, { code: 'en' }];
		const currentLanguage =
			languages.find((lang) => lang.code === locale)?.code || locale;
		const handleChangeLang = (lang: string) => {
			router.push(`/${lang}/${pathname}`);
			closeMobileMenu();
		};

		return (
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="dap-button-primary-color">
							{currentLanguage} <CaretDownIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="dap-dropdown-menu">
						{languages.map((lang) => (
							<DropdownMenuItem
								key={lang.code}
								onClick={() => handleChangeLang(lang.code)}
								className={`dap-dropdown-menu-item ${lang.code === locale ? 'active' : ''}`}
							>
								{lang.code}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	};

	return (
		<header className='bg-black/40 backdrop-blur-xl'>
			{/* pc */}
			<nav
				aria-label="Global"
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
			>
				<div className="flex lg:flex-1">{renderLogo()}</div>
				<div className="hidden lg:flex lg:gap-x-12">{renderNavBtns()}</div>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">{renderLangSelect()}</div>

				{/* mobile */}
				<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
					<SheetTrigger asChild>
						<button type="button" className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white">
							<HamburgerMenuIcon />
						</button>
					</SheetTrigger>

					<SheetContent side="right" showCloseButton={false} className="bg-black/40 text-white p-6 sm:max-w-sm">

						{/* https://www.radix-ui.com/primitives/docs/components/dialog?utm_source=chatgpt.com#title */}
						<SheetHeader>
							<SheetTitle></SheetTitle>
						</SheetHeader>

						<div className="flex items-center justify-between">
							{renderLogo()}
							<SheetClose asChild>
								<button className="p-2 text-white">
									<Cross1Icon />
								</button>
							</SheetClose>
						</div>
						<div className="mt-8 flex flex-col space-y-6">{renderNavBtns()}</div>
						<div className="mt-8 border-t border-white/10 pt-6">{renderLangSelect()}</div>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
