import FormData from 'form-data';

class NotificationsModel {
  constructor(data) {
    this.credentials = data;
    this.formData = new FormData();
  }

  setFormData() {
    this.formData.append('query', '');
    this.formData.append('origin', '');
    this.formData.append('isOpened', false);
    this.formData.append('skip', 0);
    this.formData.append('take', 10);
    return this.formData;
  }
}

export const setNotifications = () => new NotificationsModel().setFormData();
