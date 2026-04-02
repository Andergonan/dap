import { Spinner } from '../ui/spinner';

export default function PageLoading() {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<Spinner className="size-8" />
		</div>
	);
}