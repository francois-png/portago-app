import {
  UtensilsCrossed,
  Compass,
  Heart,
  Scale,
  ShoppingBag,
  Home,
  Leaf,
  Building2,
  Anchor,
  PartyPopper,
  Car,
  GraduationCap,
  Grid3X3,
} from "lucide-react";

const iconComponents: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  restaurants: UtensilsCrossed,
  activities: Compass,
  wellness: Heart,
  legal: Scale,
  shopping: ShoppingBag,
  property: Home,
  "home-garden": Leaf,
  architecture: Building2,
  marinas: Anchor,
  "events-weddings": PartyPopper,
  transport: Car,
  schools: GraduationCap,
};

export function CategoryIcon({
  slug,
  size = 24,
  className = "",
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const Icon = iconComponents[slug] || Grid3X3;
  return <Icon size={size} className={className} />;
}
