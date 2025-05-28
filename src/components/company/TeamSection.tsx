import PageSection from '@/components/shared/PageSection';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone } from 'lucide-react';

const teamMembers = [
  {
    name: "Alice Wonderland",
    role: "Chief Executive Officer",
    avatar: "https://placehold.co/120x120.png",
    dataAiHint: "woman portrait",
    email: "alice@quickintro.com",
    phone: "+1 234 567 8901",
  },
  {
    name: "Bob The Builder",
    role: "Chief Technology Officer",
    avatar: "https://placehold.co/120x120.png",
    dataAiHint: "man portrait",
    email: "bob@quickintro.com",
    phone: "+1 234 567 8902",
  },
  {
    name: "Carol Danvers",
    role: "Head of Marketing",
    avatar: "https://placehold.co/120x120.png",
    dataAiHint: "woman smiling",
    email: "carol@quickintro.com",
    phone: "+1 234 567 8903",
  },
  {
    name: "David Copperfield",
    role: "Lead Project Manager",
    avatar: "https://placehold.co/120x120.png",
    dataAiHint: "man professional",
    email: "david@quickintro.com",
    phone: "+1 234 567 8904",
  },
];

export default function TeamSection() {
  return (
    <PageSection
      id="team"
      title="Meet Our Team"
      subtitle="The passionate individuals driving our success."
    >
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <Card key={member.name} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary/50 ring-offset-2 ring-offset-background">
                <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.dataAiHint} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl text-primary">{member.name}</CardTitle>
              <CardDescription className="text-accent">{member.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href={`mailto:${member.email}`} className="flex items-center justify-center hover:text-primary transition-colors">
                  <Mail className="mr-2 h-4 w-4" /> {member.email}
                </a>
                <a href={`tel:${member.phone}`} className="flex items-center justify-center hover:text-primary transition-colors">
                  <Phone className="mr-2 h-4 w-4" /> {member.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}
