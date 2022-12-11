import { useState } from "react";
import ImgsViewer from "react-images-viewer";
import { Loading } from "react-flatifycss";
import "./style.scss";

export interface Image {
  caption?: string | React.ReactNode;
  src?: string;
  srcset?: string | string[];
  thumbnail?: string;
}

interface ImageViewerProps {
  images: Image[];
  initialIndex?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ImageViewer({ initialIndex = 0, isOpen, onClose, images }: ImageViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

  return (
    <ImgsViewer
      currImg={currentImageIndex}
      imgs={images}
      isOpen={isOpen}
      onClickNext={() => setCurrentImageIndex((current) => current + 1)}
      onClickPrev={() => setCurrentImageIndex((current) => current - 1)}
      onClickThumbnail={(i: any) => setCurrentImageIndex(i)}
      onClose={onClose}
      showCloseBtn={false}
      backdropCloseable={true}
      preloadNextImg={true}
      showThumbnails={true}
      spinner={() => <Loading size="3x" color="light-light" />}
    />
  );
}
