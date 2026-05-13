import {
  Building2,
  Lightbulb,
  ScreenShare,
  Trophy,
  User,
  User2,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import FeaturesPointerSection, { FeatureCard, FeatureItem } from '../custom-ui/FeaturesPointersSection';

// Create feature data arrays for left and right columns
const leftFeatures: FeatureItem[] = [
  {
    icon: Building2,
    title: 'Real-Time Data Insights',
    description:
      ' Get instant performance analytics and actionable business recommendations .',
    position: 'left',
    cornerStyle: 'sm:translate-x-4 sm:rounded-br-[2px]',
  },
  {
    icon: User2,
    title: 'Smart CRM Integration',
    description:
      ' Automatically capture, score, and nurture leads across connected systems.',
    position: 'left',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-br-[2px]',
  },
  {
    icon: Trophy,
    title: ' Intelligent Workflow ',
    description:
      'Automate repetitive tasks, approvals, and processes with smart AI triggers.',
    position: 'left',
    cornerStyle: 'sm:translate-x-4 sm:rounded-tr-[2px]',
  },
];

const rightFeatures: FeatureItem[] = [
  {
    icon: ScreenShare,
    title: ' Analytics',
    description:
      ' Track performance, understand data, and make smarter marketing decisions.',
    position: 'right',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-bl-[2px]',
  },
  {
    icon: User,
    title: 'System Architecture',
    description:
      'Designed to grow with your business without increasing complexity.',
    position: 'right',
    cornerStyle: 'sm:translate-x-4 sm:rounded-bl-[2px]',
  },
  {
    icon: Lightbulb,
    title: 'Tool Integrations',
    description:
      ' Connect marketing, sales, finance, and productivity tools in one ecosystem..',
    position: 'right',
    cornerStyle: 'sm:-translate-x-4 sm:rounded-tl-[2px]',
  },
];


export default function AutomationFeatures() {
  return (
    <>

    <FeaturesPointerSection heading='Automation' description='Desc' leftFeatures={leftFeatures} rightFeatures={rightFeatures} />
    
    </>
  );
}
