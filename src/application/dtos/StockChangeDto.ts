export interface StockChangeDto {
    oldStock: number;
    newStock: number;
    reason: string;
    comments?: string;
    changedAt: Date;
    changedBy: string;
}