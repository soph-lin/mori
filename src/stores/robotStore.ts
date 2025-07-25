import { create } from 'zustand';
import { HatType } from '../constants/robot';

// Types
export interface Position {
  x: number;
  y: number;
}

export interface Rotation {
  x: number; // Pitch (nodding up/down)
  y: number; // Yaw (turning left/right)
  z: number; // Roll (tilting head)
}

export type AnimationType = 'float' | 'look' | 'nod' | 'loading';

interface RobotState {
  // Appearance
  hat: HatType;
  
  // Position and animation
  position: Position;
  rotation: Rotation;
  currentAnimation: AnimationType;
  isAnimating: boolean;
  
  // Actions
  setHat: (hat: HatType) => void;
  setPosition: (position: Position) => void;
  setRotation: (rotation: Rotation) => void;
  setRotationAxis: (axis: keyof Rotation, value: number) => void;
  setAnimation: (animation: AnimationType) => void;
  toggleAnimation: () => void;
}

// Create the store
export const useRobotStore = create<RobotState>((set, get) => ({
  // Initial state
  hat: 'sapling',
  position: { x: 0, y: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  currentAnimation: 'float',
  isAnimating: true,
  
  // Actions
  setHat: (hat) => set({ hat }),
  
  setPosition: (position) => set({ position }),
  
  setRotation: (rotation) => set({ rotation }),
  
  setRotationAxis: (axis, value) => set((state) => ({
    rotation: { ...state.rotation, [axis]: value }
  })),
  
  setAnimation: (animation) => set({ currentAnimation: animation }),
  
  toggleAnimation: () => set((state) => ({ 
    isAnimating: !state.isAnimating 
  })),
})); 