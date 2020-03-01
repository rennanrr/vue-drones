import http from "../http-common";

class TutorialDataService {
  list() {
    return http.get("/drones");
  }

  detail(id) {
    return http.get(`/drones/${id}`);
  }

  update(id, data) {
    return http.put(`/drones/${id}`, data);
  }

  delete(id) {
    return http.delete(`/drones/${id}`);
  }

  /**
  * Upload new drone in the database
  * @param {Object} data - drone data
  */
  create(data) {
    return http.post("/drones", data);
  }

  find(text) {
    return http.get(`/drones?text=${text}`);
  }
}

export default new TutorialDataService();