import { Doujinshi } from '.';

export interface PaginatedDoujinshi {
  TotalItems: number;
  TotalPages: number;
  PageNumber: number;
  PageSize: number;
  Items: Doujinshi[];
}
