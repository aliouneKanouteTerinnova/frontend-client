export class StripePaymentDto {
  public order_number: string;
  public method: string;
  public amount: number;
  public currency: string;
}
