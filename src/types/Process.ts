import type { Item } from './Item'

export type Process = {
  name: string;
  base: boolean;
  items: Item[];
}
