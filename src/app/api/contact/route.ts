import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
	name: z.string().min(2, 'form-val-name-is-too-short').max(100, 'Name is too long.'),
	email: z.string().email('form-val-invalid-email-address'),
	message: z.string().min(10, 'form-val-message-is-too-short').max(5000, 'form-val-message-is-too-long'),
	company: z.string().optional() // honeypot
});

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const parsed = contactSchema.safeParse(body);

		if (!parsed.success) {
			const firstError = parsed.error.issues[0]?.message ?? 'Invalid form data.';

			return NextResponse.json(
				{ success: false, message: firstError },
				{ status: 400 }
			);
		}

		const { name, email, message, company } = parsed.data;

		// honeypot
		if (company) {
			return NextResponse.json(
				{ success: true },
				{ status: 200 }
			);
		}

		if (!process.env.RESEND_API_KEY) {
			return NextResponse.json(
				{ success: false, message: 'form-error-missing-apiKey' },
				{ status: 500 }
			);
		}

		if (!process.env.CONTACT_TO_EMAIL) {
			return NextResponse.json(
				{ success: false, message: 'form-error-missing-contactEmail' },
				{ status: 500 }
			);
		}

		const { error } = await resend.emails.send({
			from: process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
			to: [process.env.CONTACT_TO_EMAIL],
			replyTo: email,
			subject: `DAP: Žádost o kontakd od ${name}`,
			text: [
				`Name: ${name}`,
				`Email: ${email}`,
				'',
				'Message:',
				message
			].join('\n'),
			html: `
				<div style="font-family: Arial, sans-serif; line-height: 1.6;">
					<h2>David Anderle Portfolio - Nová žádost o kontatk</h2>
					<p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
					<p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
					<p><strong>Zpráva:</strong></p>
					<p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
				</div>
			`
		});

		if (error) {
			console.error('Resend error:', error);

			return NextResponse.json(
				{ success: false, message: 'form-error-failed-to-send-msg' },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ success: true },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Contact API error:', error);

		return NextResponse.json(
			{ success: false, message: 'form-error-unexpected-server-error' },
			{ status: 500 }
		);
	}
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}