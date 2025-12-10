export interface AnsiColorItems {
    basic: AnsiColorItem[],
    special: AnsiColorItem[]
}

export interface AnsiColorItem {
    code: string;
    desc: string;
    color: string;
    bgColor: string;
}