class CreateExtensionDto {
  name: string;
  status: string;
  block: boolean;

  constructor(name: string, block: boolean, status: string) {
    this.name = name;
    this.status = status;
    this.block = block;
  }
}
export default CreateExtensionDto;
