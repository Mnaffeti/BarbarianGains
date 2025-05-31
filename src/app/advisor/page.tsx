import AdvisorForm from '@/components/advisor/AdvisorForm';
import PageHeader from '@/components/shared/PageHeader';

export default function AdvisorPage() {
  return (
    <div>
      <PageHeader
        title="AI Supplement Advisor"
        subtitle="Get personalized supplement recommendations based on your fitness goals and dietary restrictions."
      />
      <AdvisorForm />
    </div>
  );
}
