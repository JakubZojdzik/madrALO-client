<script>
import { QuillEditor, Quill } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
    emits: ['modelValue'],
    props: ['placeholder'],
    data() {
        return {
            localValue: String,
            editorOption: {
                modules: {
                    toolbar: {
                        container: [['bold', 'italic', 'underline'],
                            ['blockquote', 'code-block'],
                            [{ list: 'ordered' }, { list: 'bullet' }], [{ script: 'sub' }, { script: 'super' }],
                            [{ color: [] }, { background: [] }], ['link', 'image'], ['clean']],
                        handlers: {
                            image () {
                                const range = this.quill.getSelection();
                                const value = prompt('What is the image URL');
                                if (value) {
                                    this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
                                }
                            }
                        }
                    }
                }
            }
        };
    },
    methods: {
        imageHandler() {
            const range = this.quill.getSelection();
            const value = prompt('What is the image URL');
            if (value) {
                this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
            }
        },
        onChange(xd) {
            this.$emit('modelValue', xd);
        }
    },
    components: {
        QuillEditor
    }
};
</script>

<template>
    <main>
        <div>
            <QuillEditor @update:content="onChange" theme="snow" :options="editorOption" :content="placeholder" content-type="html" />
        </div>
    </main>
</template>
