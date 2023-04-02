import { Category } from "./category";
import { LOAD_STATUSES } from "./loadStatuses";

export interface NavRoute {
  label: string;
  id: string;
  path: string;
  dropdownList?: { list: Category[], status: LOAD_STATUSES };
}
