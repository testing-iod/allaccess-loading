import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageSectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  hasContainer?: boolean; 
};

export default function PageSection({
  id,
  title,
  subtitle,
  children,
  className,
  titleClassName,
  contentClassName,
  hasContainer = true,
}: PageSectionProps) {
  const Wrapper = hasContainer ? 'div' : React.Fragment;
  const wrapperProps = hasContainer ? { className: 'container mx-auto px-4' } : {};

  return (
    <section
      id={id}
      className={cn('py-12 md:py-16 animate-in fade-in-0 slide-in-from-bottom-10 duration-700 ease-out', className)}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <Wrapper {...wrapperProps}>
        {title && (
          <div className="mb-8 md:mb-12 text-center">
            <h2
              id={id ? `${id}-title` : undefined}
              className={cn('text-3xl font-bold tracking-tight text-primary sm:text-4xl', titleClassName)}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={cn(contentClassName)}>
          {children}
        </div>
      </Wrapper>
    </section>
  );
}
