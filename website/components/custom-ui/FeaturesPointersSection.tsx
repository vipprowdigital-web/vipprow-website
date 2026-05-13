import {
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the feature item type
export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  position?: 'left' | 'right';
  cornerStyle?: string;
};

// Feature card component
export const FeatureCard = ({ feature }: { feature: FeatureItem }) => {
  const Icon = feature.icon;

  return (
    <div>
      <div
        className={cn(
          'relative rounded-2xl px-4 pt-4 pb-4 text-sm',
          'bg-secondary/50 ring-border ring',
          feature.cornerStyle,
        )}
      >
        <div className="text-blue-600 mb-3 text-[2rem]">
          <Icon />
        </div>
        <h2 className="text-foreground mb-2.5 text-2xl">{feature.title}</h2>
        <p className="text-muted-foreground text-base text-pretty">
          {feature.description}
        </p>
        {/* Decorative elements */}
        <span className="from-blue-600/0 via-blue-600 to-blue-600/0 absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r opacity-60"></span>
        <span className="absolute inset-0 bg-[radial-gradient(30%_5%_at_50%_100%,hsl(var(--blue-600)/0.15)_0%,transparent_100%)] opacity-60"></span>
      </div>
    </div>
  );
};

export type FeaturesPointerSectionProp = {
    heading: string;
    description: string;
    leftFeatures: FeatureItem[];
    rightFeatures: FeatureItem[];
}

export default function FeaturesPointerSection({heading, description, leftFeatures, rightFeatures}: FeaturesPointerSectionProp) {
  return (
    <section className="pt-20 pb-8" id="features">
      <div className="mx-6 max-w-[1120px] pt-2 pb-16 max-[300px]:mx-4 min-[1150px]:mx-auto">
        <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-3">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {leftFeatures.map((feature, index) => (
              <FeatureCard key={`left-feature-${index}`} feature={feature} />
            ))}
          </div>

          {/* Center column */}
          <div className="order-[1] mb-6 self-center sm:order-[0] md:mb-0">
            <div className="bg-secondary text-foreground ring-border relative mx-auto mb-4.5 w-fit rounded-full rounded-bl-[2px] px-4 py-2 text-sm ring">
              <span className="font-heading relative z-1 flex items-center gap-2">
                Features
              </span>
              <span className="from-blue-600/0 via-blue-600 to-blue-600/0 absolute -bottom-px left-1/2 h-px w-2/5 -translate-x-1/2 bg-gradient-to-r"></span>
              <span className="absolute inset-0 bg-[radial-gradient(30%_40%_at_50%_100%,hsl(var(--blue-600)/0.25)_0%,transparent_100%)]"></span>
            </div>
            <h2 className="font-heading text-foreground mb-2 text-center k
            text-2xl sm:mb-2.5 md:text-[2.1rem]">
            {/* The Vipprow Advantage in Digital Marketing */}

            {heading}
            </h2>
            <p className="font-heading text-muted-foreground mx-auto max-w-[18rem] text-center text-pretty">
             We help brands scale faster through intelligent campaigns powered by data and insights
             {description}
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {rightFeatures.map((feature, index) => (
              <FeatureCard key={`right-feature-${index}`} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
