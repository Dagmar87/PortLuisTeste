<template>
    <div class="submit-form mt-3 mx-auto">
        <p class="headline">Adicionar Contato</p>
        <div v-if="!submitted">
            <v-form ref="form" lazy-validation>
                <v-text-field v-model="contato.nome" :rules="[(v) => !!v || 'O nome é obrigatório']" label="Nome"
                    required></v-text-field>
                <v-text-field v-model="contato.telefone" :rules="[(v) => !!v || 'O telefone é obrigatório']"
                    label="Telefone" v-mask="'(##) #####-####'" required></v-text-field>
            </v-form>
            <v-btn color="primary" class="mt-3" @click="saveContato">Enviar</v-btn>
        </div>
        <div v-else>
            <v-card class="mx-auto">
                <v-card-title>
                    Enviado com sucesso!
                </v-card-title>
                <v-card-subtitle>
                    Clique no botão para adicionar um novo Contato.
                </v-card-subtitle>
                <v-card-actions>
                    <v-btn color="success" @click="newContato">Adicionar</v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>
<script>
import ContatoDataService from "../services/ContatoDataService";

export default {
    name: "add-contato",
    data() {
        return {
            contato: {
                id: null,
                nome: "",
                telefone: ""
            },
            submitted: false
        };
    },
    methods: {
        saveContato() {
            var data = {
                nome: this.contato.nome,
                telefone: this.contato.telefone
            };
            ContatoDataService.create(data)
                .then(response => {
                    this.contato.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        newContato() {
            this.submitted = false;
            this.contato = {};
        }
    }
};
</script>
<style>
.submit-form {
    max-width: 300px;
}
</style>