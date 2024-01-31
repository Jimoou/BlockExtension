class UpdateExtensionDto {
  id: string;
  name: string;
  block: boolean;

  constructor(id: string, name: string, block: boolean) {
    this.id = id;
    this.name = name;
    this.block = block;
  }
}
export default UpdateExtensionDto;
