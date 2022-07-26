import type { Category } from './Category'

export type UserSelection = {
  category: Category | null;
  categoryIndex: number;
  processIndex: number;
}
