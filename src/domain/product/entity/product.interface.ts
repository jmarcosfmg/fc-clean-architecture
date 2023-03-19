export default interface ProductInterface {
  changePrice(price: number): void;
  changeName(name: string): void;
  get id(): string;
  get name(): string;
  get price(): number;
}
