import axios from "axios";

const ALERT_API_BASE_URL = "http://localhost:8080/api/v1/alerts";

class AlertService {
  getAlerts() {
    return axios.get(ALERT_API_BASE_URL);
  }

  deleteAlert(id) {
    return axios.delete(ALERT_API_BASE_URL + "/" + id);
  }
}

export default new AlertService();
