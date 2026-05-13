// website\components\custom-ui\AutomationBentoGridSection.tsx

'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Code, FileText, Layers, Palette, Zap } from 'lucide-react';

interface BentoGridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const BentoGridItem = ({
  title,
  description,
  icon,
  className,
  size = 'small',
}: BentoGridItemProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 25 },
    },
  };

  return (
    <motion.div
      variants={variants}
      className={cn(
        'group border-blue-600/10 bg-background hover:border-blue-600/30 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border px-6 pt-6 pb-10 shadow-md transition-all duration-500',
        className,
      )}
    >
      <div className="absolute top-0 -right-1/2 z-0 size-full cursor-pointer bg-[linear-gradient(to_right,#0f2766_1px,transparent_1px),linear-gradient(to_bottom,#0f2766_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"></div>

      <div className="text-blue-600/5 group-hover:text-blue-600/10 absolute right-1 bottom-3 scale-[6] transition-all duration-700 group-hover:scale-[6.2]">
        {icon}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="bg-blue-600/10 text-blue-600 shadow-blue-600/10 group-hover:bg-blue-600/20 group-hover:shadow-blue-600/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow transition-all duration-500">
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="text-blue-600 mt-4 flex items-center text-sm">
         
          <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-2" />
        </div>
      </div>
      <div className="from-blue-600 to-blue-600/30 absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r blur-2xl transition-all duration-500 group-hover:blur-lg" />
    </motion.div>
  );
};

const items = [
  {
    title: 'Predictive Revenue Forecasting',
    description:
      'We use historical data and AI models to forecast sales trends and future revenue growth.',
    icon: <Code className="size-6" />,
    size: 'large' as const,
  },
  {
    title: 'Customer Journey Automation',
    description:
      'We design automated journeys that guide customers from first interaction to final conversion seamlessly.',
    icon: <Layers className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'Unified Business Command Center',
    description: 'Manage marketing, sales, and operations from one centralized automation dashboard.',
    icon: <Layers className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'Scalable Digital Infrastructure',
    description: "Vipprow creates automation systems that grow with your business without increasing complexity.",
    icon: <Palette className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'Performance',
    description: 'Vipprow builds systems that automatically scale marketing and sales as your business grows..',
    icon: <Zap className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'Smart Decision Framework',
    description:
      'continuously analyzes performance and recommends actions to improve efficiency and revenue.',
    icon: <FileText className="size-6" />,
    size: 'large' as const,
  },
];

export default function AutomationBentoGridSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            icon={item.icon}
            size={item.size}
            className={cn(
              item.size === 'large'
                ? 'col-span-4'
                : item.size === 'medium'
                  ? 'col-span-3'
                  : 'col-span-2',
              'h-full',
            )}
          />
        ))}
      </motion.div>
    </div>
  );
}
