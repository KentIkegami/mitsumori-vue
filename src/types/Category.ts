import type { Process } from './Process'
import type { PropagationGroup } from './PropagationGroup'
import type { ExtraComputed } from './ExtraComputed'

export type Category = {
  name: string;
  description: string;
  processes: Process[];
  propagation_groups: PropagationGroup[];
  extra_computeds: ExtraComputed[];
}