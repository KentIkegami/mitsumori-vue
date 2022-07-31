import type { Category } from './Category'

export type UserSelection = {
  category: Category | null;
  categoryIndex: number;
  processIndex: number;
  extra_computed_trigger_item_ids: string[],
  propagation_trigger_item_ids: string[],
}
