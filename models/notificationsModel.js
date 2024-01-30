import FormData from 'form-data';

class NotificationsModel {
  constructor(data) {
    this.params = data;
    this.formData = new FormData();
  }

  setFormData() {
    this.formData.append('query', this.params.search ?? '');
    this.formData.append('origin', this.params.filteredBy ?? '');
    this.formData.append('isOpened', this.params.watched ?? false);
    this.formData.append('skip', this.params.skip ?? 0);
    this.formData.append('take', this.params.take ?? 50);

    return this.formData;
  }
}

export const setNotifications = (data) => new NotificationsModel(data).setFormData();
