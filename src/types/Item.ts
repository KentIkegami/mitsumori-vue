import type { DetailStatic } from './DetailStatic'
import type { DetailDynamic } from './DetailDynamic'
import type { DetailDependence } from './DetailDependence'

export type Item = {
  item_id: string;
  name: string;
  is_disabled: boolean;
  is_required: boolean;
  description: string;
  type: string;
  quantity: number;
  cost: number;
  detail_static: DetailStatic | null;
  detail_dynamic: DetailDynamic | null;
  detail_dependence: DetailDependence | null;
}
