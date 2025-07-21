'use client';

import { useRobotStore } from '../../../stores/robotStore';
import { HAT_ICONS } from '../../../constants/robot';

export default function Robot() {
  const { currentAnimation, isAnimating, position, rotation, hat } =
    useRobotStore();

  // Get the appropriate animation class based on current animation
  const getAnimationClass = () => {
    if (!isAnimating) return '';

    switch (currentAnimation) {
      case 'float':
        return 'animate-float';
      case 'look':
        return 'animate-look';
      case 'nod':
        return 'animate-nod';
      case 'loading':
        return 'animate-spin-3d';
      default:
        return '';
    }
  };

  // Base rotation transform
  const baseRotation = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;

  return (
    <div
      className='relative flex flex-col items-center gap-4 p-8'
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* 3D Cube Container */}
      <div className='perspective-1000 relative h-32 w-32'>
        <div
          className={`transform-style-preserve-3d relative h-full w-full transition-transform duration-3000 ease-in-out ${getAnimationClass()}`}
          style={
            {
              transformStyle: 'preserve-3d',
              '--base-rotation': baseRotation,
              transform: isAnimating ? 'none' : baseRotation,
            } as React.CSSProperties
          }
        >
          {/* Front Face */}
          <div
            className='absolute flex h-full w-full items-center justify-center rounded-2xl border-2 border-gray-200 bg-white shadow-lg'
            style={{ transform: 'translateZ(4rem)' }}
          >
            <div className='font-mono text-lg text-gray-800'>
              ⸝⸝⸝ ˙ ꒳ ˙ ⸝⸝⸝
            </div>
          </div>

          {/* Back Face */}
          <div
            className='absolute flex h-full w-full items-center justify-center rounded-2xl border-2 border-gray-200 bg-white shadow-lg'
            style={{ transform: 'translateZ(-4rem) rotateY(180deg)' }}
          >
            <div className='text-lg text-gray-800'></div>
          </div>

          {/* Right Face */}
          <div
            className='absolute flex h-full w-full items-center justify-center rounded-2xl border-2 border-gray-200 bg-white shadow-lg'
            style={{ transform: 'translateX(4rem) rotateY(90deg)' }}
          >
            <div className='text-lg text-gray-800'></div>
          </div>

          {/* Left Face */}
          <div
            className='absolute flex h-full w-full items-center justify-center rounded-2xl border-2 border-gray-200 bg-white shadow-lg'
            style={{ transform: 'translateX(-4rem) rotateY(-90deg)' }}
          >
            <div className='text-lg text-gray-800'></div>
          </div>

          {/* Top Face */}
          <div
            className='absolute flex h-full w-full items-center justify-center rounded-2xl border-2 border-gray-200 bg-white shadow-lg'
            style={{ transform: 'translateY(-4rem) rotateX(90deg)' }}
          >
            <div className='text-lg text-gray-800'></div>
          </div>

          {/* Bottom Face */}
          <div
            className='absolute flex h-full w-full items-center justify-center rounded-2xl border-2 border-gray-200 bg-white shadow-lg'
            style={{ transform: 'translateY(4rem) rotateX(-90deg)' }}
          >
            <div className='text-lg text-gray-800'></div>
          </div>

          {/* Hat Display - Now inside the 3D cube container */}
          {hat !== 'none' && (
            <div
              className='pointer-events-none absolute flex items-center justify-center text-4xl'
              style={{
                width: '100%',
                height: '100%',
                transform: 'translateY(-5rem)',
                transformStyle: 'preserve-3d',
              }}
            >
              {HAT_ICONS[hat]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
