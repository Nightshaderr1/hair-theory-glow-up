import React from "react";
import { Wind, Lock, GitBranch, Hexagon, Flame, Minus, Equal, Square } from "lucide-react";

export const HairstyleIcons: Record<string, React.FC<{ className?: string }>> = {
  "hairstyle-loose": ({ className }) => <Wind className={className} />,
  "hairstyle-tight": ({ className }) => <Lock className={className} />,
  "hairstyle-braid": ({ className }) => <GitBranch className={className} />,
  "hairstyle-hat": ({ className }) => <Hexagon className={className} />,
  "hairstyle-heat": ({ className }) => <Flame className={className} />,
};

// Texture: visualize fiber thickness with vertical strokes of varying width
const TextureSVG = ({ widths, className }: { widths: number[]; className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {widths.map((w, i) => (
      <line
        key={i}
        x1={12 + i * 8}
        y1={6}
        x2={12 + i * 8}
        y2={42}
        stroke="currentColor"
        strokeWidth={w}
        strokeLinecap="round"
      />
    ))}
  </svg>
);

export const TextureIcons: Record<string, React.FC<{ className?: string }>> = {
  "texture-fine": ({ className }) => <TextureSVG widths={[1, 1, 1, 1]} className={className} />,
  "texture-medium": ({ className }) => <TextureSVG widths={[2.5, 2.5, 2.5]} className={className} />,
  "texture-thick": ({ className }) => <TextureSVG widths={[4.5, 4.5]} className={className} />,
};

export const getQuestionIcon = (key?: string): React.FC<{ className?: string }> | null => {
  if (!key) return null;
  return HairstyleIcons[key] || TextureIcons[key] || null;
};
