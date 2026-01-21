import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "flex flex-row space-y-3 my-3 w-full items-center",
        className,
      )}
    >
      <Skeleton className="dark:bg-secondary/20 h-[130px] w-[10%] rounded-xl" />
      <div className="space-y-2 w-full mx-2 ">
        <Skeleton className="dark:bg-secondary/20 h-[100px] rounded-xl" />
        <Skeleton className="dark:bg-secondary/20 h-[10px]" />
        <Skeleton className="dark:bg-secondary/20 h-[10px] w-2/3" />
        <Skeleton className="dark:bg-secondary/20 h-[10px] w-1/3" />
      </div>
    </div>
  );
}
