import PageSection from '@/components/shared/PageSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

const projects = [
  {
    title: "Project Alpha",
    description: "A groundbreaking web application revolutionizing e-commerce.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "modern website",
    tags: ["Web App", "E-commerce", "React"],
  },
  {
    title: "Project Beta",
    description: "An innovative mobile app for enhanced productivity and collaboration.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "mobile app",
    tags: ["Mobile App", "Productivity", "iOS & Android"],
  },
  {
    title: "Project Gamma",
    description: "Cutting-edge AI platform for data analysis and insights.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "AI interface",
    tags: ["AI", "Data Analysis", "Machine Learning"],
  },
   {
    title: "Project Delta",
    description: "Sustainable energy solution for urban environments.",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "city energy",
    tags: ["Sustainability", "Green Tech", "IoT"],
  },
];

export default function ProjectsSection() {
  return (
    <PageSection
      id="projects"
      title="Our Projects"
      subtitle="A glimpse into the innovative work we're passionate about."
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2"> {/* Adjusted to 2 columns for better image display */}
        {projects.map((project) => (
          <Card key={project.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <div className="aspect-video relative w-full rounded-md overflow-hidden mb-4">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={project.dataAiHint}
                />
              </div>
              <CardTitle className="text-2xl text-primary">{project.title}</CardTitle>
              <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mt-auto">
                {project.tags.map((tag) => (
                  <span key={tag} className="mr-2 mb-2 inline-block rounded-full bg-accent/20 px-3 py-1 text-sm font-semibold text-accent">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
