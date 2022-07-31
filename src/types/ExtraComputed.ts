
import type { VarItem } from './VarItem'
export type ExtraComputed = {
  description: string;
  calc_result: string;
  is_show: boolean;
  trigger_item_ids: string[];
  var_items: VarItem[];
  calc_logic: string;
  show_logic: string;
}