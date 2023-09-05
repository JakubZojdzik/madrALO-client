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
                        container: [
                            ['bold', 'italic', 'underline'],
                            ['blockquote', 'code-block'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ script: 'sub' }, { script: 'super' }],
                            [{
                                color: [
                                    '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff',
                                    '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666',
                                    '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00',
                                    '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600',
                                    '#003700', '#002966', '#3d1466', 'custom-color'
                                ]
                            }, { background: [] }],
                            ['link', 'image'],
                            ['clean']
                        ],
                        handlers: {
                            image() {
                                const range = this.quill.getSelection();
                                const value = prompt('What is the image URL');
                                if (value) {
                                    this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
                                }
                            },
                            color(value) {
                                if (value === 'custom-color')
                                    this.quill.format('color', window.prompt('Enter Hex Color Code'));
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
