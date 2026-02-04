'use client';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    style?: React.CSSProperties;
}

export default function Skeleton({ className = '', width, height, borderRadius, style }: SkeletonProps) {
    return (
        <div
            className={`skeleton-shimmer ${className}`}
            style={{
                width: width,
                height: height,
                borderRadius: borderRadius,
                ...style
            }}
        />
    );
}
