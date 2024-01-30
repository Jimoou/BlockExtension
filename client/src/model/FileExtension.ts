class FileExtension {
  id: string;
  name: string;
  status?: string;
  block: boolean;

  constructor(id: string, name: string, block: boolean, status?: string) {
    this.name = name;
    this.id = id;
    this.status = status;
    this.block = block;
  }
}
export default FileExtension;
