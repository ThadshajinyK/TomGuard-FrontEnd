
const ALERT_API_BASE_URL = "http://localhost:9090/api/v1/alerts";

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
