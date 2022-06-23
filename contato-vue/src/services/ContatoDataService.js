import http from "../http-common";

class ContatoDataService {
  getAll() {
    return http.get("/contatos");
  }
  get(id) {
    return http.get(`/contatos/${id}`);
  }
  create(data) {
    return http.post("/contatos", data);
  }
  update(id, data) {
    return http.put(`/contatos/${id}`, data);
  }
  delete(id) {
    return http.delete(`/contatos/${id}`);
  }
  deleteAll() {
    return http.delete(`/contatos`);
  }
  findByNome(nome) {
    return http.get(`/contatos?nome=${nome}`);
  }
}

export default new ContatoDataService();
