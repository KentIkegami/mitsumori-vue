import type { Process } from './Process'
import type { PropagationGroup } from './PropagationGroup'

export type Category = {
  name: string;
  description: string;
  processes: Process[];
  propagation_groups: PropagationGroup[];
}