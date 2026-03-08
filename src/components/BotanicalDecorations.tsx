import { motion } from "framer-motion";

// SVG leaf path for reuse
const LeafSVG = ({ className = "", size = 40 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
    <path
      d="M20 2C20 2 8 10 8 22C8 30 13.5 36 20 38C26.5 36 32 30 32 22C32 10 20 2 20 2Z"
      fill="currentColor"
      opacity="0.15"
    />
    <path
      d="M20 8V34M20 14L14 20M20 20L26 16M20 26L15 24"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.3"
    />
  </svg>
);

const FlowerSVG = ({ className = "", size = 32 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.2" />
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <ellipse
        key={angle}
        cx="16"
        cy="8"
        rx="4"
        ry="7"
        fill="currentColor"
        opacity="0.12"
        transform={`rotate(${angle} 16 16)`}
      />
    ))}
  </svg>
);

const BranchSVG = ({ className = "" }: { className?: string }) => (
  <svg width="120" height="60" viewBox="0 0 120 60" fill="none" className={className}>
    <path
      d="M0 50C20 50 30 40 50 35C70 30 80 20 100 15C110 12 120 10 120 10"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.2"
      fill="none"
    />
    <path d="M30 40C28 35 32 28 36 30C40 32 34 38 30 40Z" fill="currentColor" opacity="0.15" />
    <path d="M55 30C53 25 57 18 61 20C65 22 59 28 55 30Z" fill="currentColor" opacity="0.15" />
    <path d="M80 20C78 15 82 8 86 10C90 12 84 18 80 20Z" fill="currentColor" opacity="0.15" />
    <path d="M100 14C98 9 102 2 106 4C110 6 104 12 100 14Z" fill="currentColor" opacity="0.12" />
  </svg>
);

const DropletSVG = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 2C12 2 5 10 5 15C5 19 8 22 12 22C16 22 19 19 19 15C19 10 12 2 12 2Z"
      fill="currentColor"
      opacity="0.12"
    />
  </svg>
);

// Floating animation variants
const floatVariants = {
  animate: (i: number) => ({
    y: [0, -8, 0],
    rotate: [0, i % 2 === 0 ? 5 : -5, 0],
    transition: {
      duration: 4 + i * 0.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),
};

const driftVariants = {
  animate: (i: number) => ({
    x: [0, 6, 0],
    y: [0, -4, 0],
    transition: {
      duration: 5 + i * 0.7,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),
};

// Section-specific decorations
export const HeroDecorations = () => (
  <>
    <motion.div custom={0} variants={floatVariants} animate="animate" className="absolute top-32 left-8 text-primary hidden md:block">
      <LeafSVG size={48} />
    </motion.div>
    <motion.div custom={1} variants={driftVariants} animate="animate" className="absolute top-48 right-12 text-rose-dark hidden md:block">
      <FlowerSVG size={36} />
    </motion.div>
    <motion.div custom={2} variants={floatVariants} animate="animate" className="absolute bottom-24 left-16 text-primary hidden lg:block">
      <BranchSVG />
    </motion.div>
    <motion.div custom={3} variants={driftVariants} animate="animate" className="absolute bottom-32 right-24 text-accent hidden lg:block">
      <DropletSVG size={28} />
    </motion.div>
    <motion.div custom={4} variants={floatVariants} animate="animate" className="absolute top-1/3 left-1/4 text-sage-dark hidden xl:block">
      <LeafSVG size={32} />
    </motion.div>
  </>
);

export const QuestionnaireDecorations = () => (
  <>
    <motion.div custom={0} variants={floatVariants} animate="animate" className="absolute top-12 right-8 text-primary hidden md:block">
      <LeafSVG size={44} />
    </motion.div>
    <motion.div custom={1} variants={driftVariants} animate="animate" className="absolute bottom-16 left-12 text-primary hidden md:block">
      <LeafSVG size={36} />
    </motion.div>
    <motion.div custom={2} variants={floatVariants} animate="animate" className="absolute top-1/2 right-16 text-accent hidden lg:block">
      <DropletSVG size={32} />
    </motion.div>
    <motion.div custom={3} variants={driftVariants} animate="animate" className="absolute bottom-24 right-1/4 text-rose-dark hidden lg:block">
      <FlowerSVG size={28} />
    </motion.div>
  </>
);

export const BlogDecorations = () => (
  <>
    <motion.div custom={1} variants={driftVariants} animate="animate" className="absolute top-8 left-8 text-primary hidden md:block">
      <BranchSVG />
    </motion.div>
    <motion.div custom={0} variants={floatVariants} animate="animate" className="absolute top-16 right-12 text-accent hidden md:block">
      <LeafSVG size={40} />
    </motion.div>
    <motion.div custom={2} variants={floatVariants} animate="animate" className="absolute bottom-12 left-16 text-rose-dark hidden lg:block">
      <FlowerSVG size={32} />
    </motion.div>
    <motion.div custom={3} variants={driftVariants} animate="animate" className="absolute bottom-20 right-8 text-primary hidden lg:block">
      <DropletSVG size={26} />
    </motion.div>
  </>
);

export const ReviewsDecorations = () => (
  <>
    <motion.div custom={0} variants={floatVariants} animate="animate" className="absolute top-12 left-12 text-primary hidden md:block">
      <FlowerSVG size={36} />
    </motion.div>
    <motion.div custom={1} variants={driftVariants} animate="animate" className="absolute top-20 right-8 text-primary hidden md:block">
      <LeafSVG size={44} />
    </motion.div>
    <motion.div custom={2} variants={floatVariants} animate="animate" className="absolute bottom-16 right-16 text-accent hidden lg:block">
      <BranchSVG />
    </motion.div>
    <motion.div custom={3} variants={driftVariants} animate="animate" className="absolute bottom-12 left-8 text-rose-dark hidden lg:block">
      <DropletSVG size={30} />
    </motion.div>
  </>
);

export const AboutDecorations = () => (
  <>
    <motion.div custom={0} variants={driftVariants} animate="animate" className="absolute top-8 right-12 text-primary hidden md:block">
      <LeafSVG size={42} />
    </motion.div>
    <motion.div custom={1} variants={floatVariants} animate="animate" className="absolute bottom-12 left-8 text-accent hidden md:block">
      <BranchSVG />
    </motion.div>
    <motion.div custom={2} variants={driftVariants} animate="animate" className="absolute top-1/3 left-8 text-rose-dark hidden lg:block">
      <FlowerSVG size={30} />
    </motion.div>
  </>
);

export const FooterDecorations = () => (
  <>
    <motion.div custom={0} variants={floatVariants} animate="animate" className="absolute top-4 left-12 text-primary hidden md:block opacity-50">
      <LeafSVG size={28} />
    </motion.div>
    <motion.div custom={1} variants={driftVariants} animate="animate" className="absolute top-4 right-12 text-primary hidden md:block opacity-50">
      <LeafSVG size={24} />
    </motion.div>
  </>
);

export { LeafSVG, FlowerSVG, BranchSVG, DropletSVG };
