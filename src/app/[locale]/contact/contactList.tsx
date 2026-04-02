'use client';

import { useState } from 'react';
import BigButton from '@/components/shared/BigButton';
import { Button } from '@/components/ui/button';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactLinks } from '@/config/contact-links';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

type ContactFormState = {
	name: string;
	email: string;
	message: string;
	company: string;
};

type ContactApiResponse = {
	success?: boolean;
	message?: string;
};

export default function ContactList() {
	const tContact = useTranslations('ContactPage');

	const [formData, setFormData] = useState<ContactFormState>({
		name: '',
		email: '',
		message: '',
		company: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isSubmitting) {
			return;
		}

		setIsSubmitting(true);

		try {
			const promise: Promise<ContactApiResponse> = fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			}).then(async (response) => {
				const result: ContactApiResponse = await response.json();

				if (!response.ok || !result.success) {
					const translatedMessage = result.message ? tContact(result.message) : tContact('form-error');

					throw new Error(translatedMessage);
				}

				return result;
			});

			toast.promise(promise, {
				loading: tContact('form-submitting'),
				success: tContact('form-success'),
				error: (error) =>
					error instanceof Error ? error.message : tContact('form-error')
			});

			await promise;

			setFormData({
				name: '',
				email: '',
				message: '',
				company: ''
			});
		} catch {
			// Error already handled by toast.promise - prevent runtime crash
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<section>
				<form className="contactForm space-y-6" onSubmit={handleSubmit}>
					<FieldGroup>
						<FieldSet>
							<FieldLegend>{tContact('form-title')}</FieldLegend>
							<FieldDescription>{tContact('form-subtitle')}</FieldDescription>

							<FieldGroup>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<Field>
										<FieldLabel htmlFor="contactForm-name">
											{tContact('form-name')}
										</FieldLabel>
										<Input
											id="contactForm-name"
											name="name"
											value={formData.name}
											onChange={handleChange}
											placeholder="John Doe"
											required
											disabled={isSubmitting}
										/>
									</Field>

									<Field>
										<FieldLabel htmlFor="contactForm-email">
											{tContact('form-email')}
										</FieldLabel>
										<Input
											id="contactForm-email"
											name="email"
											type="email"
											value={formData.email}
											onChange={handleChange}
											placeholder="johndoe@example.com"
											required
											disabled={isSubmitting}
										/>
									</Field>
								</div>

								<Field>
									<FieldLabel htmlFor="contactForm-msg">
										{tContact('form-msg')}
									</FieldLabel>
									<Textarea
										id="contactForm-msg"
										name="message"
										value={formData.message}
										onChange={handleChange}
										placeholder="Text"
										className="min-h-[160px] resize-none"
										required
										disabled={isSubmitting}
									/>
								</Field>

								<div className="hidden" aria-hidden="true">
									<label htmlFor="contactForm-company">Company</label>
									<input
										id="contactForm-company"
										name="company"
										type="text"
										tabIndex={-1}
										autoComplete="off"
										value={formData.company}
										onChange={handleChange}
									/>
								</div>
							</FieldGroup>
						</FieldSet>

						<Field orientation="horizontal" className="flex justify-end">
							<BigButton
								text={tContact('form-submit')}
								ico={!isSubmitting ? <PaperPlaneIcon /> : <Spinner />}
								type="submit"
								disabled={isSubmitting}
							/>
						</Field>
					</FieldGroup>
				</form>
			</section>

			<section className="mt-30 flex flex-wrap justify-center gap-4 text-center">
				{contactLinks.map((item) => {
					const Icon = item.ico;

					return (
						<Button key={item.text} asChild className="dap-button">
							<a href={item.link} target="_blank" rel="noreferrer noopener">
								{item.text} <Icon style={{ color: 'var(--primary-color)' }} />
							</a>
						</Button>
					);
				})}
			</section>
		</>
	);
}