import type { Process } from './Process'
import type { PropagationGroup } from './PropagationGroup'
import type { ExtraLogic } from './ExtraLogic'

export type Category = {
  name: string;
  description: string;
  processes: Process[];
  propagation_groups: PropagationGroup[];
  extra_logic: ExtraLogic;
}