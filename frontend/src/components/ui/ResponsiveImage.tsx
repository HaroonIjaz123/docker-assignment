type ResponsiveImageProps = {
  src: string;
  alt: string;
  /** Cover fills a visual frame; contain preserves an entire asset such as a logo. */
  fit?: "cover" | "contain";
  /** Keeps faces near the visible area when a portrait is cropped. */
  focalPoint?: "center" | "top";
  className?: string;
  imageClassName?: string;
};

/** A bounded image frame that handles arbitrary source dimensions without distortion. */
export function ResponsiveImage({
  src,
  alt,
  fit = "cover",
  focalPoint = "center",
  className = "",
  imageClassName = "",
}: ResponsiveImageProps) {
  return (
    <div className={`image-frame image-frame--${fit} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`image-frame__image image-frame__image--${fit} image-frame__image--${focalPoint} ${imageClassName}`}
      />
    </div>
  );
}
