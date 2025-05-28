import PageSection from '@/components/shared/PageSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Target, Users } from 'lucide-react';

const features = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Our Mission",
    description: "To deliver innovative solutions that empower businesses and individuals, fostering growth and success through cutting-edge technology and dedicated expertise.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Our Vision",
    description: "To be a global leader in our industry, recognized for our commitment to excellence, sustainability, and transformative impact on the communities we serve.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Our Values",
    description: "Integrity, Collaboration, Innovation, Customer-Centricity, and Excellence. These principles guide every decision we make and action we take.",
  },
];

export default function AboutUsSection() {
  return (
    <PageSection
      id="about"
      title="About Our Company"
      subtitle="Learn more about who we are, our mission, and our core values."
    >
      <div className="max-w-3xl mx-auto text-lg text-center mb-12 text-foreground/90">
        <p>
          Founded with a passion for excellence and a commitment to innovation, QuickIntro has grown into a dynamic force in the industry. We believe in building strong relationships with our clients, understanding their unique needs, and delivering tailored solutions that drive tangible results. Our journey is one of continuous learning, adaptation, and a relentless pursuit of perfection.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              {feature.icon}
              <CardTitle className="mt-4 text-xl text-primary">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
