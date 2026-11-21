import { ArrowLeft } from 'lucide-react';
import ButtonLink from '../components/ui/Button';
import { usePageMeta } from '../lib/usePageMeta';

export default function NotFound() {
  usePageMeta('Page not found | Menil Patel');
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-start justify-center pt-28">
      <p className="eyebrow mb-4">404</p>
      <h1 className="text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">This page doesn’t exist.</h1>
      <p className="mt-4 max-w-lg text-text-secondary">The link may be outdated. Everything lives on the home page.</p>
      <ButtonLink href="/" internal className="mt-8">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to home
      </ButtonLink>
    </section>
  );
}
