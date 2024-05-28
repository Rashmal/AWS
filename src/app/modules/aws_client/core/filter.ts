import { SelectItem } from 'primeng/api';

export interface Filter {
    Type: SelectItem;
    Search: string;
    ItemsPerPage: number;
    CurrentPage: number;
}
