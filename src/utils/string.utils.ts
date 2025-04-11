export default class StringBuilder {
  private value: string;
  private constructor() {
    this.value = "";
  }
  public add(value: string): StringBuilder {
    this.value += value;
    return this;
  }
  public build(): string {
    return this.value;
  }
  public static builder() {
    return new StringBuilder();
  }
}
