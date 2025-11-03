import { useState } from 'react';

/**
 * Hook to manage modal open/close state
 * Provides convenient methods to control modal visibility
 * 
 * @param {boolean} [initialState=false] - Initial open/close state
 * @returns {Object} Modal state object
 * @returns {boolean} returns.isOpen - Current modal visibility state
 * @returns {Function} returns.open - Function to open the modal
 * @returns {Function} returns.close - Function to close the modal
 * @returns {Function} returns.toggle - Function to toggle modal state
 * 
 * @example
 * const { isOpen, open, close, toggle } = useModalState();
 * return (
 *   <>
 *     <button onClick={open}>Open Modal</button>
 *     {isOpen && (
 *       <dialog>
 *         <button onClick={close}>Close</button>
 *       </dialog>
 *     )}
 *   </>
 * );
 */
export function useModalState(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return { isOpen, open, close, toggle };
}
