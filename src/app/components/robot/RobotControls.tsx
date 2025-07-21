/**
 * UI to test robot positioning, animations, and clothing through Zustand store.
 * Simply import this component into the page, no additional setup required.
 */

'use client';

import { useRobotStore } from '../../../stores/robotStore';
import { HAT_ICONS, HatType } from '../../../constants/robot';

export default function RobotControls() {
  const {
    hat,
    position,
    rotation,
    currentAnimation,
    isAnimating,
    setHat,
    setPosition,
    setRotationAxis,
    setRotation,
    setAnimation,
    toggleAnimation,
  } = useRobotStore();

  const handleAddHat = () => {
    const hatTypes = Object.keys(HAT_ICONS) as Array<keyof typeof HAT_ICONS>;
    const currentIndex = hatTypes.indexOf(hat);
    const nextHat = hatTypes[(currentIndex + 1) % hatTypes.length] as HatType;
    setHat(nextHat);
  };

  const handleResetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setRotation({ x: 0, y: 0, z: 0 });
  };

  return (
    <div className='flex max-w-md flex-col gap-6 rounded-lg bg-gray-100 p-6'>
      <h3 className='text-xl font-semibold'>Robot Controls</h3>

      {/* Quick Action Buttons */}
      <div className='flex flex-col gap-2'>
        {/* Animation Button */}
        <button
          onClick={toggleAnimation}
          className={`w-full rounded px-4 py-2 font-medium transition-colors ${
            isAnimating
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {isAnimating ? 'Stop Animation' : 'Start Animation'}
        </button>
        {/* Reset Button */}
        <button
          onClick={handleResetPosition}
          className='w-full rounded bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600'
        >
          Reset Position & Rotation
        </button>
      </div>

      {/* Animation Selection */}
      <div className='space-y-3'>
        <label className='block text-sm font-medium text-gray-700'>
          Animation: {currentAnimation}
        </label>
        <div className='flex flex-wrap gap-2'>
          {(['float', 'look', 'nod', 'loading'] as const).map((anim) => (
            <button
              key={anim}
              onClick={() => setAnimation(anim)}
              className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
                currentAnimation === anim
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              {anim.charAt(0).toUpperCase() + anim.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Position Sliders */}
      <div className='space-y-4'>
        <h4 className='text-lg font-medium'>Position</h4>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            X Position: {position.x}px
          </label>
          <input
            type='range'
            min='-200'
            max='200'
            value={position.x}
            onChange={(e) =>
              setPosition({ ...position, x: parseInt(e.target.value) })
            }
            className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            Y Position: {position.y}px
          </label>
          <input
            type='range'
            min='-200'
            max='200'
            value={position.y}
            onChange={(e) =>
              setPosition({ ...position, y: parseInt(e.target.value) })
            }
            className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200'
          />
        </div>
      </div>

      {/* Rotation Sliders */}
      <div className='space-y-4'>
        <h4 className='text-lg font-medium'>Rotation</h4>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            X Rotation (Pitch): {rotation.x}°
          </label>
          <input
            type='range'
            min='-90'
            max='90'
            value={rotation.x}
            onChange={(e) => setRotationAxis('x', parseInt(e.target.value))}
            className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            Y Rotation (Yaw): {rotation.y}°
          </label>
          <input
            type='range'
            min='0'
            max='360'
            value={rotation.y}
            onChange={(e) => setRotationAxis('y', parseInt(e.target.value))}
            className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            Z Rotation (Roll): {rotation.z}°
          </label>
          <input
            type='range'
            min='-45'
            max='45'
            value={rotation.z}
            onChange={(e) => setRotationAxis('z', parseInt(e.target.value))}
            className='h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200'
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className='space-y-3'>
        <h4 className='text-lg font-medium'>Quick Actions</h4>
        <div className='flex flex-wrap gap-2'>
          <button
            onClick={handleAddHat}
            className='rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
          >
            Change Hat ({hat})
          </button>
        </div>
      </div>

      {/* Status Display */}
      <div className='space-y-1 text-sm text-gray-600'>
        <p>
          Position: ({position.x}, {position.y})
        </p>
        <p>
          Rotation: ({rotation.x}°, {rotation.y}°, {rotation.z}°)
        </p>
        <p>
          Animation: {currentAnimation} {isAnimating ? '(active)' : '(paused)'}
        </p>
      </div>
    </div>
  );
}
