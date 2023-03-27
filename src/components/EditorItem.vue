<script>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    data() {
        return {
            value: String
        };
    },
    created() {
        console.log('created!');
    },
    components: {
        QuillEditor
    }
};
</script>

<template>
    <main>
        <div class="editor">
            <QuillEditor
                theme="snow"
                :toolbar="[
                    ['bold', 'italic', 'underline'],
                    ['blockquote', 'code-block'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ script: 'sub' }, { script: 'super' }],
                    [{ color: [] }, { background: [] }],
                    ['clean']]"
            />
        </div>
    </main>
</template>

<style scoped>
.editor {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
}
</style>
