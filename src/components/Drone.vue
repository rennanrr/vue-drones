<template>
  <div v-if="currentDrone" class="edit-form">
    <h4>Drone</h4>
    <form>
      <div class="form-group">
        <label for="title">Nome</label>
        <input type="text" class="form-control" id="title"
          v-model="currentDrone.name"
        />
      </div>
      <div class="form-group">
        <label for="description">Endereço</label>
        <input type="text" class="form-control" id="description"
          v-model="currentDrone.address"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentDrone.status }}
      </div>
    </form>

    <button class="badge badge-danger mr-2"
      v-if="currentDrone.status === 'failed'"
      @click="updateStatus('success')"
    >
    Failed
    </button>
    <button v-else class="badge badge-success mr-2"
      @click="updateStatus('failed')"
    >
    Success
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteDrone"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateDrone"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Drone...</p>
  </div>
</template>

<script>
import DroneService from "../services/DroneService";

export default {
  name: "drone",
  data() {
    return {
      currentDrone: null,
      message: ''
    };
  },
  methods: {
    getDrone(id) {
      DroneService.detail(id)
        .then(response => {
          this.currentDrone = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateStatus(status) {
      var data = {
        status: status
      };

      DroneService.update(this.currentDrone.id, data)
        .then(response => {
          this.currentDrone.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateDrone() {
      DroneService.update(this.currentDrone.id, this.currentDrone)
        .then(response => {
          console.log(response.data);
          this.message = 'The drone was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteDrone() {
      DroneService.delete(this.currentDrone.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "drones" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getDrone(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>