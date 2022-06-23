<template>
    <v-row align="center" class="list px-3 mx-auto">
        <v-col cols="12" md="8">
            <v-text-field v-model="nome" label="Pesquisar por Nome"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
            <v-btn small @click="searchNome">
                Pesquisar
            </v-btn>
        </v-col>
        <v-col cols="12" sm="12">
            <v-card class="mx-auto" tile>
                <v-card-title>Contatos</v-card-title>
                <v-data-table :headers="headers" :items="contatos" disable-pagination :hide-default-footer="true">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editContato(item.id)">mdi-pencil</v-icon>
                        <v-icon small @click="deleteContato(item.id)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
                <v-card-actions v-if="contatos.length > 0">                    
                    <v-btn small color="error" @click="removeAllContatos">
                        Excluir tudo
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col>
            <v-btn to="/add" small color="success">
                Adicionar
            </v-btn>
        </v-col>
    </v-row>
</template>
<script>
import ContatoDataService from "../services/ContatoDataService";

export default {
    name: "contatos-list",
    data() {
        return {
            contatos: [],
            nome: "",
            headers: [
                { text: "Nome", align: "start", sortable: false, value: "nome" },
                { text: "Telefone", value: "telefone", sortable: false },
                { text: "Ações", value: "acoes", sortable: false },
            ],
        };
    },
    methods: {
        retrieveContatos() {
            ContatoDataService.getAll()
                .then((response) => {
                    this.contatos = response.data.map(this.getDisplayContato);
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        refreshList() {
            this.retrieveContatos();
        },
        removeAllContatos() {
            ContatoDataService.deleteAll()
                .then((response) => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        searchNome() {
            ContatoDataService.findByNome(this.nome)
                .then((response) => {
                    this.contatos = response.data.map(this.getDisplayContato);
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        editContato(id) {
            this.$router.push({ name: "contato-details", params: { id: id } });
        },
        deleteContato(id) {
            ContatoDataService.delete(id)
                .then(() => {
                    this.refreshList();
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getDisplayContato(contato) {
            return {
                id: contato.id,
                nome: contato.nome.length > 30 ? contato.nome.substr(0, 30) + "..." : contato.nome,
                telefone: contato.telefone.length > 30 ? contato.telefone.substr(0, 30) + "..." : contato.telefone,
            };
        },
    },
    mounted() {
        this.retrieveContatos();
    },
};
</script>
<style>
.list {
    max-width: 750px;
}
</style>