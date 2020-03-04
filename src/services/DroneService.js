import http from "../http-common";

class TutorialDataService {
  list( page, size ) {
    return http.get("/drones?" + 
      (size ? `pageSize=${size}` : '') + 
      (page ? `&page=${page}` : ''));
  }

  find( text, page, size ) {
    return http.get(`/drones?text=${text}`+ 
    (size ? `&pageSize=${size}` : '') + 
    (page ? `&page=${page}` : ''));
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
}

export default new TutorialDataService();