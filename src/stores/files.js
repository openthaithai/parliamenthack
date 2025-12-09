import {defineStore} from 'pinia'
import files from "@/services/files.js";
import {ref} from "vue";
import _ from 'underscore';

export const useFilesStore = defineStore('files', () => {

    const source = ref([]);
    const showcase = ref([]);

    async function getSource() {
        source.value = await files.source() || [];
    }

    async function getShowcase() {
        showcase.value = await files.showcase() || [];
        showcase.value = _.shuffle(showcase.value);
    }

    return {
        source,
        showcase,
        getSource,
        getShowcase
    }
})
