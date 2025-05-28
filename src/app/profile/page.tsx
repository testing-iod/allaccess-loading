import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import AboutUsSection from '@/components/company/AboutUsSection';
import TeamSection from '@/components/company/TeamSection';
import ProjectsSection from '@/components/company/ProjectsSection';
import ContactFormSection from '@/components/company/ContactFormSection';
import PageSection from '@/components/shared/PageSection';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <PageSection
          id="hero"
          className="bg-gradient-to-b from-primary/5 to-background pt-20 pb-12 md:pt-28 md:pb-20"
          hasContainer={true}
        >
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary lg:text-5xl xl:text-6xl">
              Welcome to QuickIntro
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
              Discover our journey, our people, and the innovative projects that define us.
            </p>
          </div>
        </PageSection>
        
        <AboutUsSection />
        <Separator className="my-0" />
        <TeamSection />
        <Separator className="my-0" />
        <ProjectsSection />
        <Separator className="my-0" />
        <ContactFormSection />
      </main>
      <AppFooter />
    </div>
  );
}
