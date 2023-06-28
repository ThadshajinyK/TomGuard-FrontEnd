import axios from "../axios";

const ALERT_API_BASE_URL = "/v1/alerts";

class AlertService {
  getAlerts() {
    return axios.get(ALERT_API_BASE_URL);
  }

  deleteAlert(id) {
    return axios.delete(ALERT_API_BASE_URL + "/" + id);
  }

  deleteAllAlert(){
    return axios.delete(ALERT_API_BASE_URL + "/deleteAll");
  }
}

export default new AlertService();
