import FormData from 'form-data';

class UploadFileModel {
  constructor(file) {
    this.formData = new FormData();
    this.file = file;
  }

  setFormData() {
    this.formData.append('file', this.file);
    return this.formData;
  }
}

export const setFile = (file) => new UploadFileModel(file).setFormData();
