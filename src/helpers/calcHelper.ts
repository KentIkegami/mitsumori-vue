
import type { Item } from '../types/Item';

export default function (){
  const money = (val: number): string => {
    let num = Math.round(val)
    return num.toLocaleString()
  };
  const tax = (val: number): number => {
    const rate = 0.1
    return val * rate
  };
  const unitCost = (item: Item, baseCost: number): number => {
    let n = 0;
    switch (item.type){
      case 'static':
        n = item.detail_static!.unit_cost;
        break;
      case 'dynamic':
        n = item.detail_dynamic!.unit_cost;
        break;
      case 'dependence':
        n = baseCost * item.detail_dependence!.coefficient;
        break;
      default:
        break;
    }
    return n;
  };
  return {
    money,
    tax,
    unitCost,
  }
}