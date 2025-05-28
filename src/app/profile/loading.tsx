import { Skeleton } from "@/components/ui/skeleton";
import AppHeader from "@/components/layout/AppHeader";
import AppFooter from "@/components/layout/AppFooter";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader /> {/* Render actual header as it's light */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section Skeleton */}
        <div className="py-12 md:py-16 text-center">
          <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>

        {/* About Us Section Skeleton */}
        <div className="py-12 md:py-16">
          <Skeleton className="h-10 w-1/3 mx-auto mb-8" />
          <Skeleton className="h-20 w-full mb-8" />
          <div className="grid gap-8 md:grid-cols-3">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
        
        <Skeleton className="h-px w-full my-8 md:my-12" />

        {/* Team Section Skeleton */}
        <div className="py-12 md:py-16">
          <Skeleton className="h-10 w-1/3 mx-auto mb-8" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </div>

        <Skeleton className="h-px w-full my-8 md:my-12" />

        {/* Projects Section Skeleton */}
        <div className="py-12 md:py-16">
          <Skeleton className="h-10 w-1/3 mx-auto mb-8" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-video w-full mb-4" />
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex space-x-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <AppFooter /> {/* Render actual footer as it's light */}
    </div>
  );
}
