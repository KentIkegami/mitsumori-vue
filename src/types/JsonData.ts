import type { Category } from './Category'

export type JsonData = {
  version: string;
  title: string;
  description: string;
  categories: Category[];
  terms_html: string;
}