import FormData from 'form-data';

class NotificationsModel {
  constructor(data) {
    this.params = data;
    this.formData = new FormData();
  }

  setFormData() {
    this.formData.append('query', this.params.search);
    this.formData.append('origin', '');
    this.formData.append('isOpened', this.params.watched);
    this.formData.append('skip', 0);
    this.formData.append('take', 100);
    return this.formData;
  }
}

export const setNotifications = ({ data }) => new NotificationsModel(data).setFormData();
