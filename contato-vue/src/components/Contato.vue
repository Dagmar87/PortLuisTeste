<template>
    <div v-if="currentContato" class="edit-form py-3">
        <p class="headline">Editar Contato</p>
        <v-form ref="form" lazy-validation>
            <v-text-field v-model="currentContato.nome" :rules="[(v) => !!v || 'O nome é obrigatório']" label="Nome"
                required></v-text-field>
            <v-text-field v-model="currentContato.telefone" :rules="[(v) => !!v || 'O telefone é obrigatório']"
                label="Telefone" v-mask="'(##) #####-####'" required></v-text-field>
            <v-btn color="error" small class="mr-2" @click="deleteContato">
                Excluir
            </v-btn>
            <v-btn color="success" small @click="updateContato">
                Atualizar
            </v-btn>
        </v-form>
        <p class="mt-3">{{ message }}</p>
    </div>
    <div v-else>
        <p>Por favor, clique em um Contato...</p>
    </div>
</template>
<script>
import ContatoDataService from "../services/ContatoDataService";

export default {
    name: "contato",
    data() {
        return {
            currentContato: null,
            message: "",
        };
    },
    methods: {
        getContato(id) {
            ContatoDataService.get(id)
                .then((response) => {
                    this.currentContato = response.data;
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        updateContato() {
            ContatoDataService.update(this.currentContato.id, this.currentContato)
                .then((response) => {
                    console.log(response.data);
                    this.message = "O contato foi atualizado com sucesso!";
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        deleteContato() {
            ContatoDataService.delete(this.currentContato.id)
                .then((response) => {
                    console.log(response.data);
                    this.$router.push({ name: "contatos" });
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.message = "";
        this.getContato(this.$route.params.id);
    },
};
</script>
<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>