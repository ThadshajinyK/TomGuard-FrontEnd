import axios from "axios";


class AlertService {
  getAlerts() {
    return axios.get(ALERT_API_BASE_URL);
  }

  deleteAlert(id) {
    return axios.delete(ALERT_API_BASE_URL + "/" + id);
  }
}

export default new AlertService();
