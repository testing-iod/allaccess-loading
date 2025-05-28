import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/profile" className="mr-6 flex items-center space-x-2">
          <Logo className="text-primary" />
          <span className="font-bold text-xl text-primary sm:inline-block">
            QuickIntro
          </span>
        </Link>
        {/* Navigation can be added here if needed */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" asChild>
            <Link href="#contact">
              <Briefcase className="mr-2 h-4 w-4" /> Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
