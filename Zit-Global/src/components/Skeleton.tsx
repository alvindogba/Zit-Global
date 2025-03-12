import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({ className, width, height }: SkeletonProps) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200 rounded',
        className
      )}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  );
};

export const ProjectSkeleton = () => (
  <div className="space-y-4">
    <Skeleton height={200} />
    <Skeleton width={200} />
    <Skeleton height={20} />
  </div>
);

export const CoursesSkeleton = () => (
  <div className="space-y-4">
    <Skeleton height={200} />
    <Skeleton width={200} />
    <Skeleton height={20} />
  </div>
);

export const ServiceSkeleton = () => (
  <div className="space-y-4">
    <Skeleton height={60} width={60} className="rounded-full" />
    <Skeleton width={150} />
    <Skeleton height={40} />
  </div>
);

export const BlogPostSkeleton = () => (
  <div className="space-y-4">
    <Skeleton height={200} />
    <Skeleton width={100} />
    <Skeleton width={200} />
    <Skeleton height={60} />
  </div>
);
