export default class setlikearray extends Array {
  push(...items: any[]): number {
    items.forEach(item => {
      if (!this.includes(item)) {
        super.push(item);
      }
    });

    return this.length;
  }
}
