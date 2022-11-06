export { Success } from './Success';
export { Fail } from './Fail';

export type ResultProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
};
