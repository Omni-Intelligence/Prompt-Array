import { 
  HomeIcon, 
  BookOpenIcon, 
  LayersIcon, 
  UsersIcon,
  StarIcon,
  LayoutTemplateIcon,
  Globe2Icon,
  GitBranchIcon,
  Link2Icon,
  WandIcon,
  MessageSquareIcon,
  VideoIcon,
  HelpCircleIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Library, Groups, Favorites, Templates, Batches,
  Community, Chains, Dashboard, Techniques, WhyFree
} from "@/pages";

export const getNavItems = () => [
  {
    title: "Home",
    to: "dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
    component: Dashboard,
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Library",
    to: "library",
    icon: <BookOpenIcon className="h-4 w-4" />,
    component: Library,
    color: "from-green-500 to-emerald-500",
    dynamicRoutes: true
  },
  {
    title: "Groups",
    to: "groups",
    icon: <UsersIcon className="h-4 w-4" />,
    component: Groups,
    color: "from-orange-500 to-red-500",
    dynamicRoutes: true
  },
  {
    title: "Chains",
    to: "chains",
    icon: <GitBranchIcon className="h-4 w-4" />,
    component: Chains,
    color: "from-purple-500 to-pink-500",
    dynamicRoutes: false
  },
  {
    title: "Community",
    to: "community",
    icon: <Globe2Icon className="h-4 w-4" />,
    component: Community,
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Favorites",
    to: "favourites",
    icon: <StarIcon className="h-4 w-4" />,
    component: Favorites,
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Templates",
    to: "templates",
    icon: <LayoutTemplateIcon className="h-4 w-4" />,
    component: Templates,
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "Techniques",
    to: "techniques",
    icon: <WandIcon className="h-4 w-4" />,
    component: Techniques,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Tutorial",
    to: "https://www.loom.com/share/952fd364c4c945ce8b6218b1cefd9915",
    icon: <VideoIcon className="h-4 w-4" />,
    external: true,
    color: "from-red-500 to-pink-500"
  },
  {
    title: "Why Free?",
    to: "why-free",
    icon: <HelpCircleIcon className="h-4 w-4" />,
    component: WhyFree,
    color: "from-violet-500 to-purple-500"
  }
];