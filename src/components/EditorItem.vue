<script>
import { QuillEditor, Quill } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    emits: ['modelValue'],
    data() {
        return {
            localValue: String
        }
    },
    methods: {
        quillGetHTML(inputDelta) {
            var tempQuill= new Quill(document.createElement('div'));
            tempQuill.setContents(inputDelta);
            return tempQuill.root.innerHTML;
        },
        onChange(xd) {
            const htmlContent = this.quillGetHTML(xd);
            this.$emit('modelValue', htmlContent);
        },
    },
    components: {
        QuillEditor
    }
};
</script>

<template>
    <main>
        <div>
            <QuillEditor
                v-model:content="localValue"
                @update:content="onChange"
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