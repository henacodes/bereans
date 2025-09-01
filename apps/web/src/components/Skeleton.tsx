import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-row space-y-3 my-3 w-full  items-center">
      <Skeleton className=" dark:bg-secondary/20 h-[130px] w-[10%]  rounded-xl" />
      <div className="space-y-2 w-full mx-2 ">
        <Skeleton className=" dark:bg-secondary/20 h-[100px]    rounded-xl" />
        <Skeleton className=" dark:bg-secondary/20 h-[10px]   " />
        <Skeleton className=" dark:bg-secondary/20 h-[10px] w-2/3 " />
        <Skeleton className=" dark:bg-secondary/20 h-[10px] w-1/3 " />
      </div>
    </div>
  );
}
